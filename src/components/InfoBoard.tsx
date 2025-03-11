import user from '../assets/user.svg';

const InfoBoard = () => {
  return (
    <div className="w-[50%] flex flex-col items-center">
    <ul className="w-full flex flex-row justify-between gap-5">
        <li style={ { backgroundColor: '#101318' }} className="w-[33%] flex flex-row items-center justify-center  rounded-lg">
            <img src={user} alt="user" />
            <h3 className="pl-2 text-gray-400">User 1</h3>
            <p className="pl-2">Убийств: 4</p>
        </li>
        <li style={ { backgroundColor: '#101318' }} className="w-[33%] flex flex-row items-center justify-center  rounded-lg">
            <img src={user} alt="user" />
            <h3 className="pl-2 text-gray-400">User 1</h3>
            <p className="pl-2">Убийств: 4</p>
        </li>
        <li style={ { backgroundColor: '#101318' }} className="w-[33%] flex flex-row items-center justify-center  rounded-lg">
            <img src={user} alt="user" />
            <h3 className="pl-2 text-gray-400">User 1</h3>
            <p className="pl-2">Убийств: 4</p>
        </li>
    </ul>
    <ul style={ { backgroundColor: '#101318' }} className="w-full h-15 flex mt-4 flex-row justify-between rounded-lg">
            <li className="flex flex-row jusif-center items-center">
              <h3 className="text-gray-400">Points:</h3>
              <p className="pl-2">+50</p>
            </li>
            <li className="flex flex-row jusif-center items-center">
              <h3 className="text-gray-400">Место:</h3>
              <p className="pl-2">7</p>
            </li>
            <li className="flex flex-row jusif-center items-center">
              <h3 className="text-gray-400">Всего убийств</h3>
              <p className="pl-2">50</p>
            </li>      
    </ul>
</div>
  )
}

export default InfoBoard