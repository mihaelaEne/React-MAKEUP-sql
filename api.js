export  async function  getAllMakeups(){
    let data = await api("allMakeup");

    return  data.json();
}


export async function addMakeup(ma){


let data= await api("createMakeup","POST",ma);


 return  data.json();

}





export async function updateMa(ma){
   
const method="PUT";
const body=ma;
 const response=await api("updateMakeup", method, body);

 return response.json();
 
}



export async function getMakeupById(id){
    let data=await api(`makeupById?id=${id}`);
    return data.json();
}

export async function deleteMa(maId) {
    const response = await api(`delete?id=${maId}`, 'DELETE');
    return response.json();  

}


function api(path, method = "GET", body = null) {

        const url = "http://localhost:8080/api/v1/makeup/" + path;
        const options = {
            method,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-Requested-With': 'XMLHttpRequest',
            }
        }
        if (body != null) {
            options.body = JSON.stringify(body);
        }
        
        return fetch(url, options);
}






