const DEFAULT_PHOTO = "https://avatars.mds.yandex.net/i?id=553251865b46b3acd939c54514765cda70c69fea-4120615-images-thumbs&n=13&exp=1";
//const salary = document.querySelector('#salary');

let resume = new Vue({
    el: "#app",
    data: {
        profession: '',
        city: '',
        photo: '',
        fio: '',
        phone: '',
        email: '',
        birthday: '',
        education: 'Среднее',
        salary: [],
        key_skills: 'Обучаемость; ',
        key_skill: '',
        description: '',
        university: '',
        faculty: '',
        specialization: '',
        endYear: '',
        age: '',
        phoneError: false,
        emailError: false,
        bdError: false,
        showMore: 'none',
        showMoreResume: 'none',
        r_salary: '',
    },
    computed: {
        r_profession: function () {
            return this.profession;
        },
        r_city: function () {
            if (this.city === '') return "г. Город";
            return "г. " + this.city;
        },
        r_photo: function () {
            return this.validPicture(this.photo);
        },
        r_fio: function () {
            if (this.fio === '') return "Фамилия Имя Отчество";
            return this.fio;
        },
        r_phone: function () {
            if (this.phone === '') return '';
            else if (this.validPhone(this.phone)) {
                this.phoneError = false;
                return this.phone;
            } else {
                this.phoneError = true;
                return "Телефон может состоять только из цифр и иметь длину от 6 до 10 символов.";
            }
        },
        r_email: function () {
            //const email = $("#r_email");
            if (this.email === '') return '';
            else if (this.validEmail(this.email)) {
                this.emailError = false;
                return this.email;
            } else {
                this.emailError = true;
                return "Формат почты неверный";
            }
        },
        r_birthday: function () {
            if (this.birthday === '') return '';
            let db = this.birthday.split('-');
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
            if (!this.birthday || (age > 120) || (age < 0)) {
                this.bdError = true;
                this.age = "?";
                return "Какая?";
            } else {
                this.bdError = false;
                this.age = this.age_postscript(age);
                return db[2] + '.' + db[1] + '.' + db[0];
            }
        },
        r_education: function () {
            if (this.education === "Среднее") {
                this.showMore = 'none';
                this.showMoreResume = 'none';
                return this.education;
            } else {
                this.showMore = 'block';
                this.showMoreResume = 'flex';
                return this.education;
            }
        },
        // r_salary: function () {
        // },
        r_key_skills: function () {
            return this.key_skills;
        },
        r_description: function () {
            return this.description;
        },
        r_endYear: function () {
            let reg = /^[1-2][0-9]{3}$/;
            if (reg.test(this.endYear)){
                if(this.endYear < 1930) return "?";
                else return  this.endYear;
            }
            else return "?";
        },
    },
    methods: {
        //Проверяем телефон
        //передаем строку-телефон, возвращаем true\false
        validPhone: function (phone) {
            let reg = /^[0-9]{6,10}$/;
            return reg.test(phone);
        },
        //Проверяем картиночку
        //либо поменяем, либо мы оставим нашу стандартную
        //передаем строку с url, если правильная, выводим картинку
        //иначе стандартное фото
        validPicture: function (str) {
            console.log(str);
            let img = new Image();
            img.src = str;
            img.onload = function () {
                document.getElementById("r_photo").src = str;
                return str;
            };
            img.onerror = function () {
                document.getElementById("r_photo").src = DEFAULT_PHOTO;
                return DEFAULT_PHOTO;
            };
        },
        //Проверям email по regex
        //возвращаем true/false
        validEmail: function (email) {
            let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            return regex.test(email);
        },
        //для работы с множественным выбором
        changeSalary: function () {
            const selectedValues = [].filter
                .call(salary.options, option => option.selected)
                .map(option => option.text);
            let from = selectedValues[0].split('-')[0];
            let to = selectedValues[selectedValues.length - 1].split('-')[1];
            this.r_salary = from + '-'.concat(to);
        },
        addKeySkill: function () {
            let str = this.key_skill[0].toUpperCase() + this.key_skill.slice(1).toLowerCase();
            this.key_skills += str + '; ';
            this.key_skill = '';
        },
        delKeySkill: function () {
            this.key_skills = '';
        },
        age_postscript: function (age) {
            if (age % 100 > 9 && age % 100 < 20) {
                return age + " лет";
            }
            if (age % 10 < 5 && age % 10 > 0) {
                if (age % 10 == 1) return age + " год";
                else return age + " года";
            } else return age + " лет";
        },
    },
})