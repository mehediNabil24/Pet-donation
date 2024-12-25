const load4Categories = async () => {
    const resp1 = await fetch("https://openapi.programming-hero.com/api/peddy/categories");
    const data1 = await resp1.json();
    display4Categories(data1.categories);

}

const display4Categories = (categories) => {
    const btncontainer = document.getElementById("button_container");
    categories.forEach(categorys => {
        console.log(categorys);

        const divcontainer = document.createElement('div');
        divcontainer.classList = `flex flex-row justify-between mt-10`;
        divcontainer.innerHTML = `
         <button onclick="loadpetcategory('${categorys.category}');handler()"  class="btn flex flex-row justify-center items-center gap-3 px-10 py-2 border border-[#0E7A8126] rounded-3xl"> 
          <img class="w-8" src="${categorys.category_icon}" alt="">
        "${categorys.category}"
         </button> 
        `

        btncontainer.appendChild(divcontainer);
    })
}

load4Categories();

const loadpetcategory = async (categro) => {
    const resp2 = await fetch(`https://openapi.programming-hero.com/api/peddy/category/${categro}`);
    const data2 = await resp2.json();

    displayitems(data2.data);

}
const allpet = async () => {
    const resp = await fetch("https://openapi.programming-hero.com/api/peddy/pets");
    const data = await resp.json();
    const alldata = data.pets;
    //console.log(alldata);
    displayitems(alldata);
}

const displayitems = items => {
    //console.log(items);
    const allitems = document.getElementById("all_items");
    allitems.innerHTML = " ";
    if (items.length == 0) {
        allitems.classList.remove('grid')
        allitems.innerHTML = `
        <div class="flex flex-col justify-center space-y-2 items-center text-center px-20 py-10 bg-[#13131308] mt-10 rounded-xl">
         <img src="./images/no-data 1.png" alt="">
       <p>No Information Available</p>
       <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a.</p>
        </div>
      
        `
    }

    else {
        allitems.classList.add("grid");
    }
    items.forEach(item => {
        console.log(item);

        const itemcard = document.createElement('div');
        itemcard.classList = `mt-10 gap-3`;
        const petName = item.pet_name ? item.pet_name : "Name not available";
        const breed = item.breed ? item.breed : "Breed not available";
        const birthDate = item.date_of_birth ? item.date_of_birth : "Birth date not available";
        const gender = item.gender ? item.gender : "Gender not specified";
        const price = item.price ? item.price : "Price not available";
        const image = item.image ? item.image : "./images/placeholder.png";
        itemcard.innerHTML = `
     <div class="border border-[#0E7A8126] px-3 py-1">
            <img class="w-96 rounded-xl" src="${image}" alt="">
            <p class="mt-4">"${petName}"</p>
            <div class="mt-2 space-y-2">
                <div class="flex flex-row gap-2">
                    <img src="./images/Frame.jpg" alt="">
                    <p><span>Breed:</span>"${breed}"</p>
                </div>
                <div class="flex flex-row gap-2">
                    <img src="./images/Frame (1).png" alt="">
                    <p><span>Birth:</span>"${birthDate}"</p>
                </div>
                <div class="flex flex-row gap-2">
                    <img src="./images/Frame (2).png" alt="">
                    <p><span>Gender:</span> "${gender}"</p>
                </div>
                <div class="flex flex-row gap-2">
                    <img src="./images/Frame (3).png" alt="">
                    <p><span>Price:</span> "${price}"</p>
                </div>
            </div>
            <hr class="mt-3">
            <div class="flex flex-row justify-between items-center mt-3">
                <button onclick="likepet('${item.petId}')" class="border border-[#13131399] px-3 py-1 rounded-xl">
                    <img src="./images/Frame (4).png" alt="">
                </button>
                <button  class="adopt-btn border border-[#13131399] px-3 py-1 text-[#0E7A81] font-medium rounded-xl">Adopt</button>
                <button onclick="showdetails('${item.petId}')"  class="border border-[#13131399] px-3 py-1 text-[#0E7A81] font-medium rounded-xl">Details</button>
            </div>
            
        </div>
    `

        allitems.appendChild(itemcard);

    })

    getAllAdoptButtons();
}



const showdetails = async (id) => {
    const resp3 = await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
    const data3 = await resp3.json();
    const phone = data3.petData;
    showpetdetails(phone);

}

const showpetdetails = (ph) => {
    //console.log(ph);


    const petdetailscontainer = document.getElementById("pet_details_container");
    const petName = ph.pet_name ? ph.pet_name : "Name not available";
    const breed = ph.breed ? ph.breed : "Breed not available";
    const birthDate = ph.date_of_birth ? ph.date_of_birth : "Birth date not available";
    const gender = ph.gender ? ph.gender : "Gender not specified";
    const price = ph.price ? ph.price : "Price not available";
    const image = ph.image ? ph.image : "./images/placeholder.png";
    const vaccinated_status = ph.vaccinated_status ? ph.vaccinated_status : "Vaccine status not available"
    petdetailscontainer.innerHTML = `
    <img class="w-full" src="${image}" alt="">
    <h3 class="text-lg font-bold">"${petName}"</h3>
    <div class="mt-2 space-y-2 flex flex-row justify-between">
     <div class="flex flex-col space-y-2">
         <div class="flex flex-row gap-2">
             <img src="./images/Frame.jpg" alt="">
             <p><span>Breed:</span>"${breed}"</p>
         </div>
         <div class="flex flex-row gap-2">
             <img src="./images/Frame (2).png" alt="">
             <p><span>Gender:</span> "${gender}"</p>
         </div>
         <div class="flex flex-row gap-2">
             <img src="./images/Frame (2).png" alt="">
             <p><span>Vaccinated status:</span> "${vaccinated_status}"</p>
         </div>
     </div>
     <div class="flex flex-col space-y-2">
         <div class="flex flex-row gap-2">
             <img src="./images/Frame (1).png" alt="">
             <p><span>Birth:</span>"${birthDate}"</p>
         </div>
         <div class="flex flex-row gap-2">
             <img src="./images/Frame (3).png" alt="">
             <p><span>Price:</span> "${price}"</p>
         </div>
     </div>
     
 </div>
 <hr class="mt-2">
 <div class="mt-3">
     <p class="text-xl font-bold">Details Information</p>
 <p>"${ph.pet_details}"</p>
 </div>
      `
    showdetailsss.showModal();

}

const likepet = async(id) => {
   //console.log(id);
   const resp4=await fetch(`https://openapi.programming-hero.com/api/peddy/pet/${id}`);
   const data4=await resp4.json();
   const DATA=data4.petData;
   showlike(DATA); 
}

const showlike =(pet) =>{
    //console.log(pet);
    const likebtn=document.getElementById("likebtn1");
    const divcontainer2=document.createElement('div');
    divcontainer2.classList="grid grid-cols-2 ";
    divcontainer2.innerHTML=`
    <img src="${pet.image}" alt="">
    `
    likebtn.appendChild(divcontainer2);
}


// Function to get all "Adopt" buttons
const getAllAdoptButtons = () => {
    const adoptButtons = document.querySelectorAll('.adopt-btn'); // Assuming you add 'adopt-btn' class to each Adopt button
    const countdownOverlay = document.getElementById('countdown-overlay');
    const countdownText = document.getElementById('countdown-text');
    adoptButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            let countdown = 3;
            const originaltext = button.textContent;
            button.disable = true;
            // Show the countdown overlay
            countdownOverlay.classList.remove('hidden');
            countdownText.textContent = countdown; // Show initial countdown number
            //console.log(e.target.innerText="Adopted");
            // Perform any additional actions here, like triggering the adoption process
           const countdownInterval=setInterval(()=>{
            countdown--;
            countdownText.textContent=countdown;

            if(countdown<0){
                clearInterval(countdownInterval);
                countdownOverlay.classList.add('hidden');
                button.textContent="Adopted";
                button.disable=true;
            }
           },1000);
       
        });
    });
};

const handler = () =>
    {
        toggleloading(true);
        setTimeout(() => {
            toggleloading(false); // Hide the spinner after loading finishes
        }, 300); // Example: Hide after 3 seconds

        
    }
    
    const toggleloading = (isloading) =>{
     const loadingbtn=document.getElementById('loading-spinner');
     if(isloading)
     {
        loadingbtn.classList.remove('hidden');
    }
     else{
        loadingbtn.classList.add('hidden');
    }
     }


     

allpet();
