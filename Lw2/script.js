const DEFAULT_PHOTO = "https://avatars.mds.yandex.net/i?id=553251865b46b3acd939c54514765cda70c69fea-4120615-images-thumbs&n=13&exp=1";
//Это мне пригодится в дальнейшем
const phone = $("#phone");
const birthday = $("#birthday");
const skills = $(".skills");
const salary = document.querySelector('#salary');

phone.keydown(e => changePhone(e));//только цифры
// phone.keyup(e => changeResume(e));//обычное действие

birthday.change(e => changeResume(e));//выбор из календаря
// birthday.keyup(e => changeResume(e));//ввод

salary.addEventListener('click', e => changeSalary(e));
//То, что я вызову 1 раз
$(".form-control").keyup(e => changeResume(e))
// $("#profession").keyup(e => changeResume(e));
// $("#city").keyup(e => changeResume(e));
// $("#photo").keyup(e => changeResume(e));
// $("#fio").keyup(e => changeResume(e));
// $("#email").keyup(e => changeResume(e));
$("#education").change(e => changeResume(e));
// $("#description").keyup(e => changeResume(e));

$("#addSkillButton").click(e => addKeySkill(e));
$("#deleteButton").click(e => delKeySkill(e));
//Кнопка добавления,
// добавляет один ключевой навык, обновляет резюме
function addKeySkill(e) {
    const addedSkill = $("#addSkill");
    skills.html(skills.html() + " " + addedSkill.val());
    addedSkill.val('');
    resume.field = skills.html();
    $("#r_skills").html(resume.key_skills);
}
//Кнопка удаления,
// удаляет все навыки, очищает резюме
function delKeySkill(e) {
    skills.html('');
    resume.field = skills.html();
    $("#r_skills").html(resume.key_skills);
}
//Отключение enter в форме
$(document).ready(function () {
    $("#resume_Form").keydown(function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            return false;
        }
    });
});
//Отключение submit в форме
$(document).submit(function (event) {
    event.preventDefault();
});
//Запрещает 3кнопки в номере телефона
function changePhone(e) {
    if (e.key === '-' || e.key === '+' || e.key === 'e') {
        e.preventDefault();
    }
}
//Валидация емейла
function isEmail(email) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
//Текущее (выделенное) поле
let target_Field = '';
//Проверяем картиночку
//либо поменяем, либо мы оставим нашу стандартную
function checkIMG(str) {
    let img = new Image();
    img.src = str;
    img.onload = function () {
        $("#r_photo").attr('src', str);
    };
    img.onerror = function () {
        $("#r_photo").attr('src', DEFAULT_PHOTO);
    };
}

let resume = new Vue({
    data: {
        field: target_Field,
    },
    set: function (newValue) {
        this.field = target_Field;
    },
    computed: {
        profession: function () {
            $("#r_profession").html(this.field);
        },
        city: function () {
            $("#r_city").html("г. " + this.field);
        },
        photo: function () {
            checkIMG(this.field);
        },
        fio: function () {
            $("#r_fio").html(this.field);
        },
        phone: function () {
            const phone = $("#r_phone");
            if (this.field <= 99999999999) {
                phone.css('color', 'black');
                phone.html(this.field);
            } else {
                phone.css('color', 'red');
                phone.html("Слишком много цифр!");
            }
        },
        email: function () {
            const email = $("#r_email");
            if (isEmail(this.field)) {
                email.css('color', 'black');
                email.html(this.field);
            } else {
                email.css('color', 'red');
                email.html("Формат почты неверный");
            }
        },
        birthday: function () {
            const birthday = $("#r_birthday");
            let db = this.field.split('-');
            let now = new Date();
            let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
            let dob = new Date(db[0], db[1] - 1, db[2]); //Дата рождения
            dob.setFullYear(db[0].padStart(4, '0'));
            let dobnow = new Date(today.getFullYear(), dob.getMonth(), dob.getDate());
            let age = today.getFullYear() - dob.getFullYear();
            //Если ДР в этом году ещё предстоит, то вычитаем из age один год
            if (today < dobnow) {
                age = age - 1;
            }
            if (!this.field || (age > 120) || (age < 0)) {
                birthday.html('какая?');
            } else birthday.html(`${db[2]}.${db[1]}.${db[0]} (${age})`);
        },
        education: function () {
            $("#r_education").html(this.field);
        },
        salary: function () {
            return this.field;
        },
        key_skills: function () {
            this.field = this.field.replace(/\s+/g, ' ');
            this.field = this.field.replace(' ', '');
            $("#r_skills").html(this.field.replaceAll(' ', '<br>'));
        },
        description: function () {
            $("#r_description").html(this.field);
        },
    },
})
//Получаем то, что написал юзер и "вычисляем" резюме
//
function changeResume(e) {
    let line = "$(\"#" + e.target.id + "\").val()";//получить значение текущего поля
    let line2 = "resume." + e.target.id;//вычисляемое свойство
    resume.field = eval(line);
    eval(line2);
}
//Это функция для изменения диапазона зп
function changeSalary() {
    const selectedValues = [].filter
        .call(salary.options, option => option.selected)
        .map(option => option.text);
    let from = selectedValues[0].split('-')[0];
    let to = selectedValues[selectedValues.length - 1].split('-')[1];
    resume.field = from + '-'.concat(to);
    $("#r_salary").html(resume.salary);
}
