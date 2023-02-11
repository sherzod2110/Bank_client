import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'

const complex = () => {
    const [data, setData] = useState([]);
    
    const handleSubmitComplex = (e) => {
        e.preventDefault();
        const { complexName, companyId } = e.target;
        console.log(complexName.value, companyId.value);
    
        fetch(`http://localhost:1000/complexPost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: complexName.value,
            companyId: companyId.value,
          }),
        });
        complexName.value = ''
      };

      const deleteComplex = (id) => {
            fetch(`http://localhost:1000/complexDelete/${id}`, {
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



    const [companies, setCompanies] = useState([]);
    useEffect(() => {
        fetch('http://localhost:1000/companiesGet')
        .then((res) => res.json())
        .then((data) => setCompanies(data))
        .catch(err => console.log(err))
    
    }, [companies]);

    return(
        <>
            <div className="container-xl">
                <Navbar/>
                <div className="ms-3">
                    <h1 className="mt-3" style={{color: "#0062A8"}}>New Add Complex</h1>

                    <div className=" my-3">
                       <form className="d-flex justify-content-around" onSubmit={(e) => handleSubmitComplex(e)}>
                       <div className="w-25">
                            <h5>Complex name</h5>
                            <input className="form-control" name="complexName" type="text" placeholder="Complex name" required autoComplete="off"/>
                        </div>
                        <div className="w-25">
                            <h5>Companyaga biriktirish</h5>
                            <select className="form-control" name="companyId" >
                                 <option value="" disabled>
                                      Select company
                                </option>
                                {companies?.map((company, index) => {
                                return (
                                    <option key={index} value={company?.company_id}>
                                        {company?.company_name}
                                    </option>
                                );
                                })}
                            </select>
                        </div>
                        <div className="" style={{marginTop: "33px"}}>
                            <button className="btn btn-success" type="submit" style={{width: '200px'}}>Add</button>
                        </div>
                       </form>
                    </div>

                    <ul className="list-unstyled d-flex gap-3 mt-4 flex-wrap">
                        {complex && complex.map(e => {
                            return <li className="p-3" key={e.complex_id} style={{boxShadow: '2px 13px 32px -4px rgb(95 117 124 / 32%)', width: '300px', height: 'auto', borderRadius: '10px', boxSizing: 'border-box'}}>
                                        <img src={e.company_img} alt=""  width={265} height={200}/>
                                        <p className="text-center mt-2" style={{fontSize: '18px'}}>{e.company_name}</p>
                                        <p className="text-center" style={{fontSize: '18px'}}>{e.complex_name}</p>
                                        <button  className="mt-2 btn btn-danger w-100" onClick={() => deleteComplex(e?.complex_id) }>Delete</button>
                                     </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default complex;