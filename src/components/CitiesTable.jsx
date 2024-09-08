import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'


const CitiesTable = () => {

    const [citiesData, setCitiesData] = useState([])
    const [searchCity, setSearchCity] = useState("")
    const [filterCities, setFilterCities] = useState([])
    const [hasMore, setHasMore] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)

    useEffect(() => {
        getCitiesData();
    }, [])

    const getCitiesData = () => {
        setTimeout(async()=>{
            try {
            
                const res = await axios.get(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=10&offset=${(currentPage-1)*10}`)
                   
                const newCities = res.data.results
                 setCitiesData(prevCities => [...prevCities, ...newCities])
                 
                 //check if there are more data to load
                 setCurrentPage(prevPage => prevPage + 1) 
                 if (newCities.length === 0) {
                     setHasMore(false)
                 }
                 
     
     
             } catch (err) {
                 console.log("error found", err)
             }
        },1000)
        
    }



    const handleSearchCity = (e) => {
        setSearchCity(e.target.value);
    }

    useEffect(()=> {

       const filterCity = citiesData.filter((city) =>(
        city.name.toLowerCase().includes(searchCity.toLowerCase())
       ))

       setFilterCities(filterCity)

    },[citiesData, searchCity])


    const handleRightClick = (e, cityName) => {
        if (e.button == 2) {
            window.open(`/weather/${cityName}`, "_blank")
        }
    }

    //console.log("filter state", filterCities)

    //console.log("state", citiesData)

  return (
    <>
        <div className=' container mx-auto mt-20 pl-5 pr-5 px-auto'>
            <h2 className='text-center text-4xl font-bold mb-4'>Cities Table</h2>
            <input className='border-2 border-black mx-4 px-3 py-2 rounded-lg w-[20%]' placeholder='Search Your City...' onChange={handleSearchCity} value={searchCity}/>
            <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="overflow-hidden">
                <InfiniteScroll 
                    dataLength={citiesData.length} 
                    next={getCitiesData}
                    hasMore={hasMore}
                    loader={<h4 className='text-center font-bold'>Loading...</h4>}
                    endMessage={<p style={{textAlign:'center'}}><b>No More Data To Load</b></p>}
                
                >
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
                    <thead>
                        <tr>
                        <th
                            scope="col"
                            className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500">
                            City
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
                        >
                            Country
                        </th>
                        <th
                            scope="col"
                            className="px-6 py-3 text-start text-lg font-semibold text-gray-500 uppercase dark:text-neutral-500"
                        >
                            Timezone
                        </th>
                        
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                        {
                            filterCities.map((city, i) => (
                                <tr className="hover:bg-gray-100 dark:hover:bg-neutral-700" key={i}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black-800 dark:text-200 cursor-pointer"  onContextMenu={(e)=>handleRightClick(e, city.name)}>
                            <Link to={`/weather/${city.name}`}>
                            {city.name}
                            </Link>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {city.cou_name_en}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
                            {city.timezone}
                        </td>
                        
                        </tr>
                            ))
                        }
                        
                    </tbody>
                    </table>
                    </InfiniteScroll>
                </div>
                </div>
            </div>
            </div>
        </div>
    </>
  )
}

export default CitiesTable