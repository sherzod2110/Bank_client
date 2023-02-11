import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'

const rooms = () => {
    const [data, setData] = useState([]);
    
    const handleSubmitRoom = (e) => {
        e.preventDefault();
        const {  roomCount, xonaMetr, roomMuch, complexName } = e.target;
        console.log( Number(roomCount.value), xonaMetr.value, roomMuch.value, complexName.value);
    
        fetch(`http://localhost:1000/roomPost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            room_number: Number(roomCount.value),
            room_meter_square: Number(xonaMetr.value),
            room_sum_square: Number(roomMuch.value),
            complex_id: complexName.value
          })
        })
        .then(res => res.json())
        .then(data => console.log(data))
      };


      const deleteRoom = (id) => {
            fetch(`http://localhost:1000/roomDelete/${id}`, {
            method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => setData(data));
      };

    const [complex, setComplex] = useState([]);
    useEffect(() => {
        fetch('http://localhost:1000/complexGet')
        .then((res) => res.json())
        .then((comp) => setComplex(comp))
        .catch(err => console.log(err))
    }, [complex]);



    const [room, setRoom] = useState([]);
    useEffect(() => {
        fetch('http://localhost:1000/roomGet')
        .then((res) => res.json())
        .then((data) => setRoom(data))
        .catch(err => console.log(err))
    
    }, [room]);

    return(
        <>
            <div className="container-xl">
                <Navbar />
                <div className="ms-3">
                    <h1 className="mt-3" style={{color: "#0062A8"}}>New Add Rooms</h1>

                    <div className=" my-3">
                       <form className="d-flex justify-content-around flex-wrap gap-1" onSubmit={(e) => handleSubmitRoom(e)}>
                       <div className="w-25">
                            <h5>Complex biriktirish</h5>
                            <select className="form-control" name="complexName" >
                                 <option disabled>
                                      Select company
                                </option>
                                {complex?.map((e, index) => {
                                return (
                                    <option key={index} value={e?.complex_id}>
                                        {e.company_name} {e.complex_name} 
                                    </option>
                                );
                                })}
                            </select>
                        </div>
                        <div className="w-25">
                            <h5>Xoana soni</h5>
                            <select className="form-control" name="roomCount" >
                                <option value="Choose" disabled>Choose</option>
                                 <option value="2">2</option>
                                 <option value="3">3</option>
                                 <option value="4">4</option>
                                 <option value="5">5</option>
                            </select>
                        </div>

                        <div className="w-25">
                            <h5>Xoana necha metr</h5>
                            <input className="form-control" type="number" name="xonaMetr" />
                        </div>

                        <div className="w-25">
                            <h5>How Much</h5>
                            <input className="form-control" type="number" name="roomMuch" placeholder="10 000 000..."/>
                        </div>
                        <div className="" style={{marginTop: "33px"}}>
                            <button className="btn btn-success" type="submit" style={{width: '200px'}}>Add</button>
                        </div>
                       </form>
                    </div>

                    <ul className="list-unstyled d-flex gap-3 mt-4 flex-wrap">
                        {room && room.map(e => {
                            return <li className="p-3" key={e.room_id} style={{boxShadow: '2px 13px 32px -4px rgb(95 117 124 / 32%)', width: '300px', height: 'auto', borderRadius: '10px', boxSizing: 'border-box'}}>
                                        <p className="text-center mt-2" style={{fontSize: '18px'}}> <span>Complex nomi:</span> {e.complex_name} {e.company_name}</p>
                                        <img src={e.company_img} alt=""  width={265} height={200}/>
                                        <p className="text-center mt-2" style={{fontSize: '18px'}}> <span>Room count:</span> {e.room_number} <span>xona</span></p>
                                        <p className="text-center" style={{fontSize: '18px'}}> <span>Metr:</span> {e.room_meter_square} <span>m <sup>2</sup> </span></p>
                                        <p className="text-center" style={{fontSize: '18px'}}> <span>How much:</span> {e.room_sum_square} <span>so'm</span></p>
                                        <button  className="mt-2 btn btn-danger w-100" onClick={() => deleteRoom(e?.room_id) }>Delete</button>
                                     </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default rooms;