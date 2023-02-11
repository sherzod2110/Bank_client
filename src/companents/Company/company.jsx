import { useState, useEffect } from "react";
import Navbar from '../Navbar/Navbar'

const company = () => {
    const [companies, setCompanies] = useState([]);
    const [data, setData] = useState([]);
    
    const handleSubmitCompany = (e) => {
        e.preventDefault();
        const { companyName, companyImg } = e.target;
        fetch(`http://localhost:1000/compamiesPost`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: companyName.value,
            img: companyImg.value,
          }),
        });
        companyName.value = ''
        companyImg.value = ''
      };

      const deleteCompany = (id) => {
            fetch(`http://localhost:1000/companiesDelete/${id}`, {
            method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => setData(data));
      };


    useEffect(() => {
        fetch('http://localhost:1000/companiesGet')
        .then((res) => res.json())
        .then((data) => setCompanies(data))
        .catch(err => console.log(err)) 
    
    }, [companies]);
    console.log(companies);

    return(
        <>
            <div className="container-xl">

          <Navbar />

                <div className="ms-3">
                    <h1 className="mt-3" style={{color: "#0062A8"}}>New Add Company</h1>

                    <div className=" my-3">
                       <form className="d-flex justify-content-around" onSubmit={(e) => handleSubmitCompany(e)}>
                       <div className="w-25">
                            <h5>Company name</h5>
                            <input className="form-control" id="tt" name="companyName" type="text" placeholder="Company name" required autoComplete="off"/>
                        </div>
                        <div className="w-25">
                            <h5>Company image</h5>
                            <input className="form-control" id="tt" name="companyImg" type="text" placeholder="Img url link..." required autoComplete="off"/>
                        </div>
                        <div className="" style={{marginTop: "33px"}}>
                            <button className="btn btn-success" type="submit" style={{width: '200px'}}>Add</button>
                        </div>
                       </form>
                    </div>

                    <ul className="list-unstyled d-flex gap-3 mt-4 flex-wrap">
                        {companies && companies.map(company => {
                            return  <li className="p-3" key={company.company_id} style={{boxShadow: '2px 13px 32px -4px rgb(95 117 124 / 32%)', width: '300px', height: 'auto', borderRadius: '10px', boxSizing: 'border-box'}}>
                                        <p className="text-center" style={{fontSize: '18px'}}>{company.company_name}</p>
                                        <img src={company.company_img} alt="" width={265} height={200}/>
                                        <button  className="mt-2 btn btn-danger w-100" onClick={() => deleteCompany(company?.company_id) }>Delete</button>
                                    </li>
                        })}
                    </ul>
                </div>
            </div>
        </>
    )
}

export default company;