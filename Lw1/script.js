const typeSelector = document.querySelector(".types");
//тип величин по умолчанию
let thisType = "time";

typeSelector.addEventListener('click', e => changeType(e));
//Функция дял смены величин
//
//принимает вызвавший ее div, меняет текущий тип величин
function changeType(e){
    if(e.target.id !== ""){
        let newType = "#". concat(e.target.id);
        document.querySelector(newType).classList.add('selectedType');
        document.querySelector(newType).classList.remove('type');
        document.querySelector("#" . concat(thisType)).classList.remove('selectedType');
        document.querySelector("#" . concat(thisType)).classList.add('type');

        let newTypeFields = ".". concat(e.target.id) . concat("Fields");
        document.querySelector(".". concat(thisType) . concat("Fields")).style.display = "none";
        document.querySelector(newTypeFields).style.display = "flex";
        thisType = e.target.id;
    }
}
//для смены полей местами
const reverseValues = document.querySelectorAll(".revert");
//поля для времени
const timeInputField = document.querySelector("#timeInputField");
const timeInputType = document.querySelectorAll(".selectInpValue")[0];
const timeOutputType = document.querySelectorAll(".selectOutValue")[0];
const timeOutputField = document.querySelector("#timeOutputField");

let time = new Vue ({
    el: '#time',
    data: {
        introducedTime: timeInputField.value
    },
    set: function (newValue){
        this.introducedTime = newValue;
    },
    computed: {
        _0ToSec: function() {
            return this.introducedTime;
        },
        _1ToSec: function() {
            return this.introducedTime * 60;
        },
        _2ToSec: function() {
            return this.introducedTime * 60 * 60;
        },
        _3ToSec: function() {
            return this.introducedTime * 60 * 60 * 24;
        },
        _4ToSec: function() {
            return this.introducedTime * 60 * 60 * 24 * 7;
        },
        _5ToSec: function() {
            return this.introducedTime * 60 * 60 * 24 * 365;
        },
        secTo_0: function() {
            return this.introducedTime;
        },
        secTo_1: function() {
            return this.introducedTime / 60;
        },
        secTo_2: function() {
            return this.introducedTime / 60 / 60;
        },
        secTo_3: function() {
            return this.introducedTime / 60 / 60 / 24;
        },
        secTo_4: function() {
            return this.introducedTime / 60 / 60 / 24 / 7;
        },
        secTo_5: function() {
            return this.introducedTime / 60 / 60 / 24 / 365;
        }
    },
})

timeInputField.addEventListener('keyup', timeInputChanged);
timeInputType.addEventListener('click', timeInputChanged);
timeOutputType.addEventListener('click', timeInputChanged);
//Конвертирует величины
function timeInputChanged(){
    time.introducedTime = timeInputField.value;
    let line = "time._" + timeInputType.options.selectedIndex + "ToSec";
    time.introducedTime = eval(line);
    line = "time.secTo_" + timeOutputType.options.selectedIndex;
    timeOutputField.value = eval(line);
}
//Вызывается по кнопке поменять, меняет поля местами
reverseValues[0].addEventListener('click', function(){
    let put = timeInputField.value;
    timeInputField.value = timeOutputField.value;
    timeOutputField.value = put;
    put = timeInputType.options.selectedIndex;
    timeInputType.options.selectedIndex = timeOutputType.options.selectedIndex;
    timeOutputType.options.selectedIndex = put;
})
//поля для дистанции
const distanceInputField = document.querySelector("#distanceInputField");
const distanceInputType = document.querySelectorAll(".selectInpValue")[1];
const distanceOutputType = document.querySelectorAll(".selectOutValue")[1];
const distanceOutputField = document.querySelector("#distanceOutputField");

let distance = new Vue ({
    el: '#distance',
    data: {
        introducedDistance: distanceInputField.value
    },
    set: function (newValue){
        this.introducedDistance = newValue;
    },
    computed: {
        _0ToMm: function(){
            return this.introducedDistance * 25.4;
        },
        _1ToMm: function(){
            return this.introducedDistance;
        },
        _2ToMm: function(){
            return this.introducedDistance * 1000;
        },
        _3ToMm: function(){
            return this.introducedDistance * 1000000;
        },
        _4ToMm: function(){
            return this.introducedDistance * 304.8;
        },
        _5ToMm: function(){
            return this.introducedDistance * 1609344;
        },
        _6ToMm: function(){
            return this.introducedDistance * 1852000;
        },
        mmTo_0: function(){
            return this.introducedDistance / 25.4;
        },
        mmTo_1: function(){
            return this.introducedDistance;
        },
        mmTo_2: function(){
            return this.introducedDistance / 1000;
        },
        mmTo_3: function(){
            return this.introducedDistance / 1000000;
        },
        mmTo_4: function(){
            return this.introducedDistance / 304.8;
        },
        mmTo_5: function(){
            return this.introducedDistance / 1609344;
        },
        mmTo_6: function(){
            return this.introducedDistance / 1852000;
        },
    },
})

distanceInputField.addEventListener('keyup', distanceInputChanged);
distanceInputType.addEventListener('click', distanceInputChanged);
distanceOutputType.addEventListener('click', distanceInputChanged);
//Конвертирует величины
function distanceInputChanged(){
    distance.introducedDistance = distanceInputField.value;
    let line = "distance._" + distanceInputType.options.selectedIndex + "ToMm";
    distance.introducedDistance = eval(line);
    line = "distance.mmTo_" + distanceOutputType.options.selectedIndex;
    distanceOutputField.value = eval(line);
}
//Вызывается по кнопке поменять, меняет поля местами
reverseValues[1].addEventListener('click', function(){
    let put = distanceInputField.value;
    distanceInputField.value = distanceOutputField.value;
    distanceOutputField.value = put;
    put = distanceInputType.options.selectedIndex;
    distanceInputType.options.selectedIndex = distanceOutputType.options.selectedIndex;
    distanceOutputType.options.selectedIndex = put;
})

const temperatureInputField = document.querySelector("#temperatureInputField");
const temperatureInputType = document.querySelectorAll(".selectInpValue")[2];
const temperatureOutputType = document.querySelectorAll(".selectOutValue")[2];
const temperatureOutputField = document.querySelector("#temperatureOutputField");

let temperature = new Vue ({
    el: '#temperature',
    data: {
        introducedTemperature: temperatureInputField.value
    },
    set: function (newValue){
        this.introducedTemperature = newValue;
    },
    computed: {
        _0ToK: function (){
            return Number(this.introducedTemperature) + 273.15;
        },
        _1ToK: function (){
            return (Number(this.introducedTemperature) - 32) * (5/9) + 273.15;
        },
        _2ToK: function (){
            return this.introducedTemperature;
        },
        kTo_0: function (){
            return this.introducedTemperature - 273.15;
        },
        kTo_1: function (){
            return (Number(this.introducedTemperature) - 273.15) * 9/5 + 32 ;
        },
        kTo_2: function (){
            return this.introducedTemperature;
        },
    },
})

temperatureInputField.addEventListener('keyup', temperatureInputChanged);
temperatureInputType.addEventListener('click', temperatureInputChanged);
temperatureOutputType.addEventListener('click', temperatureInputChanged);
//Конвертирует величины
function temperatureInputChanged(){
    temperature.introducedTemperature = temperatureInputField.value;
    let line = "temperature._" + temperatureInputType.options.selectedIndex + "ToK";
    temperature.introducedTemperature = eval(line);
    line = "temperature.kTo_" + temperatureOutputType.options.selectedIndex;
    temperatureOutputField.value = eval(line);
}
//Вызывается по кнопке поменять, меняет поля местами
reverseValues[2].addEventListener('click', function(){
    let put = temperatureInputField.value;
    temperatureInputField.value = temperatureOutputField.value;
    temperatureOutputField.value = put;
    put = temperatureInputType.options.selectedIndex;
    temperatureInputType.options.selectedIndex = temperatureOutputType.options.selectedIndex;
    temperatureOutputType.options.selectedIndex = put;
})

const geomAngleInputField = document.querySelector("#geomAngleInputField");
const geomAngleInputType = document.querySelectorAll(".selectInpValue")[3];
const geomAngleOutputType = document.querySelectorAll(".selectOutValue")[3];
const geomAngleOutputField = document.querySelector("#geomAngleOutputField");

let geomAngle = new Vue ({
    el: '#geomAngle',
    data: {
        introducedGeomAngle: timeInputField.value
    },
    set: function (newValue){
        this.introducedGeomAngle = newValue;
    },
    computed: {
        _0ToGrad: function() {
            return this.introducedGeomAngle * 57.3;
        },
        _1ToGrad: function() {
            return this.introducedGeomAngle;
        },
        gradTo_0: function() {
            return this.introducedGeomAngle / 57.3;
        },
        gradTo_1: function() {
            return this.introducedGeomAngle;
        },
    },
})

geomAngleInputField.addEventListener('keyup', geomAngleInputChanged);
geomAngleInputType.addEventListener('click', geomAngleInputChanged);
geomAngleOutputType.addEventListener('click', geomAngleInputChanged);
//Конвертирует величины
function geomAngleInputChanged(){
    geomAngle.introducedGeomAngle = geomAngleInputField.value;
    let line = "geomAngle._" + geomAngleInputType.options.selectedIndex + "ToGrad";
    geomAngle.introducedGeomAngle = eval(line);
    line = "geomAngle.gradTo_" + geomAngleOutputType.options.selectedIndex;
    geomAngleOutputField.value = eval(line);
}
//Вызывается по кнопке поменять, меняет поля местами
reverseValues[3].addEventListener('click', function(){
    let put = geomAngleInputField.value;
    geomAngleInputField.value = geomAngleOutputField.value;
    geomAngleOutputField.value = put;
    put = geomAngleInputType.options.selectedIndex;
    geomAngleInputType.options.selectedIndex = geomAngleOutputType.options.selectedIndex;
    geomAngleOutputType.options.selectedIndex = put;
})