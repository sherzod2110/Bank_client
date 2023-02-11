import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'

const bank = () => {
    const [data, setData] = useState([]);
    
    const handleSubmitBank = (e) => {
        e.preventDefault();
        const { BankName, bankSum, bankYear, bankPercent } = e.target;
        console.log(BankName.value, bankSum.value);
        
        fetch(`http://localhost:1000/bankPost`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: BankName.value,
                sum: bankSum.value,
                year: bankYear.value,
                percent: bankPercent.value,
            }),
        });
        BankName.value = ''
        bankSum.value = ''
        bankPercent.value = ''
    };
    
    const deleteBank = (id) => {
        fetch(`http://localhost:1000/bankDelete/${id}`, {
            method: "DELETE",
        })
        .then((res) => res.json())
        .then((data) => setData(data));
    };
    
    
    
    const [bank, setBank] = useState([]);

    useEffect(() => {
        fetch('http://localhost:1000/bankGet')
        .then((res) => res.json())
        .then((data) => setBank(data))
        .catch(err => console.log(err))
    
    }, [bank]);

    return(
        <>
            <div className="container-xl">
                <Navbar />
                <div className="ms-3">
                    <h1 className="mt-3" style={{color: "#0062A8"}}>New Add Bank</h1>

                    <div className=" my-3">
                       <form className="d-flex justify-content-around gap-1 flex-wrap" onSubmit={(e) => handleSubmitBank(e)}>
                       <div className="w-25">
                            <h5>Bank name</h5>
                            <input className="form-control" id="tt" name="BankName" type="text" placeholder="Bank name" required autoComplete="off"/>
                        </div>
                        <div className="w-25">
                            <h5>Bank qancha berolishi</h5>
                            <input className="form-control" id="tt" name="bankSum" type="number" placeholder="Bank sum" required autoComplete="off"/>
                        </div>
                        <div className="w-25">
                            <h5>Necha yilga berishi</h5>
                            <select className="form-control" name="bankYear">
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </select>
                        </div>

                        <div className="w-25 mt-2">
                            <h5>Foiz</h5>
                            <input className="form-control" id="tt" name="bankPercent" type="number" placeholder="Necha foizga..." required autoComplete="off"/>
                        </div>
                        <div className="" style={{marginTop: "37px"}}>
                            <button className="btn btn-success" type="submit" style={{width: '200px'}}>Add</button>
                        </div>
                       </form>
                    </div>

                    <ul className="list-unstyled d-flex gap-3 mt-4 flex-wrap">
                        {bank && bank.map(e => {
                            return <li className="p-3" key={e.bank_id} style={{boxShadow: '2px 13px 32px -4px rgb(95 117 124 / 32%)', width: '300px', height: 'auto', borderRadius: '10px', boxSizing: 'border-box'}}>
                                        <p className="text-center" style={{fontSize: '18px'}}> <span>Bank name: </span> {e.bank_name}</p>
                                        <p className="text-center" style={{fontSize: '18px'}}> <span>Giving: </span> {e.bank_max_sum}</p>
                                        <p className="text-center" style={{fontSize: '18px'}}> <span>Percentage: </span> {e.bank_percent} <span>%</span></p>
                                        <p className="text-center" style={{fontSize: '18px'}}> {e.bank_max_year} <span>yilga</span> </p>
                                        <button  className="mt-2 btn btn-danger w-100" onClick={() => deleteBank(e?.bank_id) }>Delete</button>
                                     </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default bank;