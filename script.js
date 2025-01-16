import Chart from "chart.js/auto";
Chart.defaults.color = '#FFFFF0';
Chart.defaults.borderColor = '#FFFFF0';
const dropdown = document.querySelector('.dropdown');
const dropdownContent = document.querySelector('.dropdown-content');
dropdown.addEventListener('mouseenter', () => {
    dropdownContent.style.display = 'block';
    dropdownContent.classList.remove('fade-away');
    dropdownContent.classList.add('fall-down');
});

dropdown.addEventListener('mouseleave', () => {
    dropdownContent.classList.remove('fall-down');
    dropdownContent.classList.add('fade-away');
    dropdownContent.addEventListener('animationend', () => {
        if (dropdownContent.classList.contains('fade-away')) {
            dropdownContent.style.display = 'none';
        }
    }, { once: true });
});
let log = function(data){
    console.log(data);
}
let colorpad = ["#1A1A2E", "#3E2A47", "#C79F63", "#F4E1C1", "#FFFFF0", "#4B3F72", "#7A6E3F", "#B6A56B", "#F1D0A1"];
let data =[
    {name: "bob",value: [10,15,20]},
    {name: "alice",value: [30,40,50]},
    {name: "charlie",value: [70,90,110]}
];
let format = ["candy","idk","oreos"];
const process = function(data,name){
    let result = [];
    for(let i =0;i<data[0].value.length;i++){
        let obj = [];
        for(let row of data){
            obj.push(row.value[i]);
        }
        result.push(obj);
    }
    let ans=[];
    for(let i =0;i<result.length;i++){
        let obj = {};
        obj.label = name[i];
        obj.data = result[i];
        obj.backgroundColor = colorpad[Math.floor(Math.random()*colorpad.length)];
        log(obj);
        ans.push(obj);
    }
    return ans;
}
const graph = function(id,data,format){
    var a = data.map(row => row.name);
    let chart = new Chart(id,{
        type: "bar",
        data:{
            labels: a,
            datasets: process(data,format),
        },
        options:{
            customCanvasBackgroundColor: {
                color: '#2C2C2C',
            }
        }
    });
    return chart;
}
const load = function(row,columm){
    const table = document.createElement("table");
    table.id = "data_table";
    const head = document.createElement("tr");
    head.id = "head";
    table.appendChild(head);
    for(let i =0;i<row;i++){
        const th = document.createElement("th");
        th.contentEditable = true;
        th.id = `th${i}`;
        if(i==0){
            th.innerText = `name`
        }
        else
            th.innerText = `placeholder`
        head.appendChild(th);
    }
    for(let i =0;i<columm-1;i++){
        const tr = document.createElement("tr");
        tr.id = `tr${i}`;
        table.appendChild(tr);
        for(let j =0;j<row;j++){
            const td = document.createElement("td");
            td.contentEditable = true;
            td.id = `td${i}${j}`;
            if(j==0){
                td.innerText = `placeholder`
            }
            else
                td.innerText = `0`
            tr.appendChild(td);
        }
    }
    document.getElementById("home").appendChild(table);
}
const getdata = function(row,columm){
    const table = document.getElementById("data_table");
    let ans = [];
    for(let i =1;i<row;i++){
        let obj = {name:document.getElementById(`th${i}`).innerText,value:[]};
        for(let j=1;j<columm;j++){
            console.log(`td${j-1}${i}`);
            obj.value.push(parseFloat(document.getElementById(`td${j-1}${i}`).innerText));
        }
        ans.push(obj);
    }
    let format = [];
    for(let i=1;i<columm;i++){
        format.push(document.getElementById(`td${i-1}0`).innerText);
    }
    Chart.getChart("test").destroy();
    graph(document.getElementById("test"),ans,format);
}
let row = 3;
let columm = 4;
document.getElementById("row").addEventListener("change", () => {
    row = document.getElementById("row").value;
    document.getElementById("data_table").remove();
    load(row,columm);
});
document.getElementById("column").addEventListener("change", () => {
    columm = document.getElementById("column").value;
    document.getElementById("data_table").remove();
    load(row,columm);
});
document.getElementById("color").addEventListener("change", () => {
    colorpad = document.getElementById("color").value.split(",");
    try{
        document.getElementById("colorcontainer").remove();
    }
    catch(err){
        log(err);
    }
    let colorcontainer = document.createElement("div");
    colorcontainer.id = "colorcontainer";
    colorcontainer.style.display = "flex";
    colorcontainer.style.gap = "10px";
    colorcontainer.style.flexWrap = "wrap";
    for(let color of colorpad){
        let div = document.createElement("div");
        div.style.backgroundColor = color;
        div.style.width = "50px";
        div.style.height = "50px";
        div.setAttribute("data-color", color);
        colorcontainer.appendChild(div);
    }
    document.getElementById("color_cont").appendChild(colorcontainer);
});
document.getElementById("color_button").addEventListener("click", () => {
    let color = document.getElementById("color_picker").value;
    if(document.getElementById("color").value==""){
        document.getElementById("color").value = color;
    }
    else
        document.getElementById("color").value += `,${color}`;
        colorpad = document.getElementById("color").value.split(",");
    try{
        document.getElementById("colorcontainer").remove();
    }
    catch(err){
        log(err);
    }
    let colorcontainer = document.createElement("div");
    colorcontainer.id = "colorcontainer";
    colorcontainer.style.display = "flex";
    colorcontainer.style.gap = "10px";
    colorcontainer.style.flexWrap = "wrap";
    for(let color of colorpad){
        let div = document.createElement("div");
        div.style.backgroundColor = color;
        div.style.width = "50px";
        div.style.height = "50px";
        div.setAttribute("data-color", color);
        colorcontainer.appendChild(div);
    }
    document.getElementById("color_cont").appendChild(colorcontainer);
});
document.getElementById("Color1").addEventListener("click", () => {
    document.getElementById("color").value = "#1A1A2E,#3E2A47,#C79F63,#F4E1C1,#FFFFF0,#4B3F72,#7A6E3F,#B6A56B,#F1D0A1";
    colorpad = document.getElementById("color").value.split(",");
    try{
        document.getElementById("colorcontainer").remove();
    }
    catch(err){
        log(err);
    }
    let colorcontainer = document.createElement("div");
    colorcontainer.id = "colorcontainer";
    colorcontainer.style.display = "flex";
    colorcontainer.style.gap = "10px";
    colorcontainer.style.flexWrap = "wrap";
    for(let color of colorpad){
        let div = document.createElement("div");
        div.style.backgroundColor = color;
        div.style.width = "50px";
        div.style.height = "50px";
        div.setAttribute("data-color", color);
        colorcontainer.appendChild(div);
    }
    document.getElementById("color_cont").appendChild(colorcontainer);
});
document.getElementById("Color2").addEventListener("click", () => {
    document.getElementById("color").value = "#FF5733,#33FF57,#3357FF,#FF33A1,#FFC300,#50C878,#8A2BE2,#FF6F61,#00CED1";
    colorpad = document.getElementById("color").value.split(",");
    try{
        document.getElementById("colorcontainer").remove();
    }
    catch(err){
        log(err);
    }
    let colorcontainer = document.createElement("div");
    colorcontainer.id = "colorcontainer";
    colorcontainer.style.display = "flex";
    colorcontainer.style.gap = "10px";
    colorcontainer.style.flexWrap = "wrap";
    for(let color of colorpad){
        let div = document.createElement("div");
        div.style.backgroundColor = color;
        div.style.width = "50px";
        div.style.height = "50px";
        div.setAttribute("data-color", color);
        colorcontainer.appendChild(div);
    }
    document.getElementById("color_cont").appendChild(colorcontainer);
});
function getFormattedDateTime() {
    // Get the current date and time
    const now = new Date();

    // Extract individual components
    const year = now.getFullYear(); // 4-digit year (e.g., 2023)
    const month = String(now.getMonth() + 1).padStart(2, '0'); // Month (01-12)
    const day = String(now.getDate()).padStart(2, '0'); // Day (01-31)
    const hour = String(now.getHours()).padStart(2, '0'); // Hour (00-23)
    const minute = String(now.getMinutes()).padStart(2, '0'); // Minute (00-59)
    const second = String(now.getSeconds()).padStart(2, '0'); // Second (00-59)

    // Combine into the desired format: yearmonthdayhourminutesecond
    const formattedDateTime = `${year}${month}${day}${hour}${minute}${second}`;

    return formattedDateTime;
}
document.getElementById("report_button").addEventListener("click", () => {
    let data = document.getElementById("report").value;
});
load(4,3);//columm, row = 4,3
document.getElementById("button").addEventListener("click", () => getdata(columm,row));
const chart = graph(document.getElementById("test"),data,format);