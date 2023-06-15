const toggleModal1 = () => {
  const modal1 = document.getElementById("instruction-modal1");
  const modalContent1 = document.getElementById("instruction-modal-content1");
  modal1.style.display = 'flex';
  
  modalContent1.textContent = "In this stacked bar visualization, you can gain insights into the performance of different countries over time. To do this, move your mouse over a segment of the stacked bar corresponding to a specific country. A tooltip will appear displaying the name of the country along with the number of wins it has achieved in that particular year. Additionally, as you hover over a specific country’s segment, the visualization may also highlight or provide aggregated data for that country's performance across all years. This allows you to not only see the yearly performance but also understand trends and accumulative achievements.";
}

const closeModalButton1 = document.getElementById('close-btn1');
const modal1 = document.getElementById('instruction-modal1');

const closeModal1 = () => {
  modal1.style.display = 'none';
}
closeModalButton1.addEventListener('click', closeModal1);


const howToReadButton1 = document.getElementById('how-to-read-btn1');
howToReadButton1.addEventListener('click', toggleModal1);




const toggleModal2 = () => {
  const modal2 = document.getElementById("instruction-modal2");
  const modalContent2 = document.getElementById("instruction-modal-content2");
  modal2.style.display = 'flex';
  
  modalContent2.textContent = "To explore the network visualization, move your mouse over a specific country node. When you hover over a node, it will turn aqua light blue, indicating that it is the main node currently in focus. Additionally, any nodes that are connected to this main node will change to a gold color, and the edges connecting them will turn Shamrock Green. This color-coding helps to easily identify the main node and its connections within the network.";
}

const closeModalButton2 = document.getElementById('close-btn2');
const modal2 = document.getElementById('instruction-modal2');

const closeModal2 = () => {
  modal2.style.display = 'none';
}
closeModalButton2.addEventListener('click', closeModal2);


const howToReadButton2 = document.getElementById('how-to-read-btn2');
howToReadButton2.addEventListener('click', toggleModal2);




const toggleModal3 = () => {
    const modal3 = document.getElementById("instruction-modal3");
    const modalContent3 = document.getElementById("instruction-modal-content3");
    modal3.style.display = 'flex';
    
    modalContent3.textContent = "To interact with the map and obtain information about host counts in different countries, simply hover your mouse over a country of interest. Upon doing this, a tooltip will appear, displaying the name of the country along with the number of hosts it contains. Additionally, the map employs a color-coded legend, wherein darker shades represent a higher number of host counts. This visual representation helps to immediately discern which countries have a larger concentration of hosts.";
  }
  
const closeModalButton3 = document.getElementById('close-btn3');
const modal3 = document.getElementById('instruction-modal3');
  
  const closeModal3 = () => {
    modal3.style.display = 'none';
  }
closeModalButton3.addEventListener('click', closeModal3);


const howToReadButton3 = document.getElementById('how-to-read-btn3');
howToReadButton3.addEventListener('click', toggleModal3);




const toggleModal4 = () => {
    const modal4 = document.getElementById("instruction-modal4");
    const modalContent4 = document.getElementById("instruction-modal-content4");
    modal4.style.display = 'flex';
    
    modalContent4.textContent = "A word cloud visualization is presented, where each player's name is depicted as a text element. The size of each name varies, symbolizing the number of goals scored by that particular player. Upon hovering over a player's name with the mouse, an interactive tooltip emerges. This tooltip reveals the name of the player along with the exact number of goals they have scored, providing a quantified representation of the size property.";
  }
  
const closeModalButton4 = document.getElementById('close-btn4');
const modal4 = document.getElementById('instruction-modal4');
  
  const closeModal4 = () => {
    modal4.style.display = 'none';
  }
closeModalButton4.addEventListener('click', closeModal4);


const howToReadButton4 = document.getElementById('how-to-read-btn4');
howToReadButton4.addEventListener('click', toggleModal4);
