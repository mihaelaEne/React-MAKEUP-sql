import { addMakeup, getAllMakeups, getMakeupById, updateMa, deleteMa } from "./api.js";

export async function setHome() {
    let container = document.querySelector(".container");

    container.innerHTML = `
    <h1>Makeup</h1>
    <button id="crtBtn">Create new makeup</button>
    <table>
        <thead>
            <tr>
                <th>Id-alias</th>
                <th>Marca</th>
                <th>Magazin</th>
                <th>Pret</th>
            </tr>
        </thead>
        <tbody id="table-body">
            <tr>
                <td>
                    <a href="book_detail.html">Makeup cu ID 1</a>
                </td>
                <td>L'Oreal</td>
                <td>DM</td>
                <td>200</td>
            </tr>
        </tbody>
    </table>
    `;

    await popupateTable();

    let button = document.getElementById("crtBtn");
    let tbody = document.getElementById("table-body");

    tbody.addEventListener("click", async (e) => {
        let obj = e.target;
        if (obj.classList.contains("book-id")) {
            console.log(obj.textContent);
            let makeup = await getMakeupById(obj.textContent);
            setUpdatePage(makeup);
        }
    });

    button.addEventListener("click", async (e) => {
        setCreateNewMakeup();
    });
}

async function popupateTable() {
    let makeups = await getAllMakeups();
    let tableBody = document.querySelector("#table-body");
    tableBody.innerHTML = "";
    makeups.forEach(element => {
        tableBody.appendChild(createRow(element));
    });
}

// function createRow(makeup) {
//     let row = document.createElement("tr");
//     row.innerHTML = `
//                 <td class="book-id">
//                     ${makeup.id}
//                 </td>
//                 <td>${makeup.marca}</td>
//                 <td>${makeup.magazin}</td>
//                 <td>${makeup.pret}</td>
//     `;
//     return row;
// }

// async function setCreateNewMakeup() {
//     let container = document.querySelector(".container");
//     container.innerHTML = `
//     <h1>New makeup</h1>
//     <ul id="error-list" class="error" style="color: red; display: none;">
//         <h2 class="error">Ooops!</h2> 
//     </ul>
//     <form>
//         <p>
//             <label for="title">Marca</label>
//             <input name="title" type="text" id="title">
//         </p>
//         <p>
//             <label for="author">Magazin</label>
//             <input name="author" type="text" id="author">
//         </p>
//         <p>
//             <label for="year">Year</label>
//             <input name="year" type="text" id="year">
//         </p>
//         <p>
//             <button type="button" id="submitBtn">Create New makeup</button>
//         </p>
//         <p>
//             <button type="button" id="backBtn">Inapoi la lista de produse</button>
//         </p>
//     </form>
//     `;

//     let submit = document.getElementById("submitBtn");
//     let backBtn = document.getElementById("backBtn");

//     backBtn.addEventListener("click", async () => {
//         await setHome();
//     });

//     submit.addEventListener("click", async () => {
//         const marca = document.getElementById('title').value;
//         const magazin = document.getElementById('author').value;
//         const pret = document.getElementById('year').value;

//         let errors = [];

//         if (!marca) errors.push("Marca este necompletata.");
//         if (!magazin) errors.push("Magazinul nu este necompletat.");
//         if (!pret) errors.push("Pretul este necompletat.");

//         if (errors.length > 0) {
//             displayErrors(errors);
//             return;
//         }

//         const makeup = {
//             marca: marca,
//             magazin: magazin,
//             pret: pret
//         };

//         let response = await addMakeup(makeup);

//         alert(response.message);
//         await setHome();
//     });
// }

// function displayErrors(errors) {
//     let errorList = document.getElementById('error-list');
//     errorList.innerHTML = "<h2 class='error'>Ooops!</h2>";
//     errors.forEach(error => {
//         let li = document.createElement('li');
//         li.textContent = error;
//         errorList.appendChild(li);
//     });
//     errorList.style.display = 'block';
// }

// export async function setUpdatePage(makeup) {
//     if (!makeup) {
//         console.error("Makeup-ul nu a este gasit");
//         return;
//     }

//     let container = document.querySelector(".container");
//     container.innerHTML = `
//     <h1>Update makeup</h1>
//     <form>
//         <p id="error-message" style="color: red; display: none;">Ooops! All fields are required.</p>
//         <p>
//             <label for="title">Marca</label>
//             <input name="title" type="text" id="title" value="${makeup.marca}">
//         </p>
//         <p>
//             <label for="author">magazin</label>
//             <input name="author" type="text" id="author" value="${makeup.magazin}">
//         </p>
//         <p>
//             <label for="year">Pret</label>
//             <input name="year" type="text" id="year" value="${makeup.pret}">
//         </p>
//         <p>
//             <button type="button" id="updateBtn">Update</button>
//         </p>
//         <p>
//             <button type="button" id="deleteBtn">Delete</button>
//         </p>
//         <p>
//             <button type="button" id="backBtn">Inapoi la lista de produse</button>
//         </p>
//     </form>
//     `;

//     let updBtn = document.getElementById("updateBtn");
//     let deleteBtn = document.getElementById("deleteBtn");
//     let backBtn = document.getElementById("backBtn");

//     backBtn.addEventListener("click", async () => {
//         await setHome();
//     });

//     if (updBtn) {
//         updBtn.addEventListener("click", async () => {
//             const marca = document.getElementById('title').value;
//             const magazin = document.getElementById('author').value;
//             const pret = document.getElementById('year').value;

//             if (!marca || !magazin || !pret) {
//                 document.getElementById('error-message').style.display = 'block';
//                 return;
//             }

//             const ma = {
//                 id: makeup.id,
//                 marca: marca,
//                 magazin: magazin,
//                 pret: pret
//             };

//             await updateMa(ma);
//             alert("Produsul de makeup-ul a fost actualizat.");
//             await setHome();
//         });
//     }

//     if (deleteBtn) {
//         deleteBtn.addEventListener("click", async () => {
//             let response = await deleteMa(makeup.id);
//             if (response.ok) {
//                 alert("Produsul a fost stears.");
//                 await setHome();
//             } else {
//                 await setHome();
//             }
//         });
//     }
// }