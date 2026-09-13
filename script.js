```javascript
/* =========================================
   DATA MENU
=========================================

   DI SINI tempat Anda mengganti menu.

   Format tanggal:
   "YYYY-MM-DD"

========================================= */

const menuData = {

    "2026-09-08": {
        title: "Menu Makan Bergizi",

        rice: "Nasi Putih",

        mainDish: "Ayam Goreng",

        vegetable: "Tumis Kangkung",

        fruit: "Pisang",

        drink: "Susu",

        updated: "8 September 2026, 06:30"
    },


    "2026-09-14": {
        title: "Menu Makan Bergizi",

        rice: "Nasi Putih",

        mainDish: "Ayam Goreng",

        vegetable: "Tumis Kangkung",

        fruit: "Pisang",

        drink: "Susu",

        updated: "14 September 2026, 06:30"
    },


    "2026-09-15": {
        title: "Menu Makan Bergizi",

        rice: "Nasi Putih",

        mainDish: "Telur Balado",

        vegetable: "Sayur Sop",

        fruit: "Apel",

        drink: "Susu",

        updated: "15 September 2026, 06:30"
    },


    "2026-09-16": {
        title: "Menu Makan Bergizi",

        rice: "Nasi Putih",

        mainDish: "Ikan Goreng",

        vegetable: "Capcay",

        fruit: "Jeruk",

        drink: "Susu",

        updated: "16 September 2026, 06:30"
    }

};


/* =========================================
   VARIABEL
========================================= */

let currentDate = new Date();


/* =========================================
   FORMAT TANGGAL UNTUK DATA
========================================= */

function formatDateKey(date) {

    const year = date.getFullYear();

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    return `${year}-${month}-${day}`;
}


/* =========================================
   FORMAT TANGGAL INDONESIA
========================================= */

function formatDateIndonesia(date) {

    const days = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jumat",
        "Sabtu"
    ];

    const months = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];

    const dayName =
        days[date.getDay()];

    const day =
        date.getDate();

    const month =
        months[date.getMonth()];

    const year =
        date.getFullYear();

    return {
        dayName,
        fullDate: `${day} ${month} ${year}`
    };
}


/* =========================================
   TAMPILKAN MENU
========================================= */

function showMenu(date) {

    /* -------------------------------------
       TANGGAL
    ------------------------------------- */

    const key = formatDateKey(date);

    const formatted =
        formatDateIndonesia(date);

    document.getElementById(
        "dayName"
    ).textContent = formatted.dayName;

    document.getElementById(
        "dateText"
    ).textContent = formatted.fullDate;


    /* -------------------------------------
       DATA MENU
    ------------------------------------- */

    const menu = menuData[key];


    /* -------------------------------------
       NAMA FILE GAMBAR OTOMATIS
       
       Format:
       DD - MM - YYYY.jpeg

       Contoh:
       08 - 09 - 2026.jpeg
    ------------------------------------- */

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const year =
        date.getFullYear();

    const imagePath =
        `images/${day} - ${month} - ${year}.jpeg`;


    /* -------------------------------------
       ELEMENT GAMBAR
    ------------------------------------- */

    const image =
        document.getElementById("menuImage");

    const placeholder =
        document.getElementById("imagePlaceholder");


    /* -------------------------------------
       JIKA GAMBAR BERHASIL DIMUAT
    ------------------------------------- */

    image.onload = function () {

        image.style.display = "block";

        placeholder.style.display = "none";

        console.log(
            "Gambar berhasil dimuat:",
            imagePath
        );
    };


    /* -------------------------------------
       JIKA GAMBAR TIDAK DITEMUKAN
    ------------------------------------- */

    image.onerror = function () {

        image.style.display = "none";

        placeholder.style.display = "flex";

        console.log(
            "Gambar tidak ditemukan:",
            imagePath
        );
    };


    /* -------------------------------------
       MULAI LOAD GAMBAR
    ------------------------------------- */

    image.style.display = "block";

    placeholder.style.display = "none";

    image.src = imagePath;


    /* -------------------------------------
       JIKA DATA MENU TIDAK ADA
    ------------------------------------- */

    if (!menu) {

        document.getElementById(
            "menuTitle"
        ).textContent =
            "Menu Belum Tersedia";

        document.getElementById(
            "rice"
        ).textContent = "-";

        document.getElementById(
            "mainDish"
        ).textContent = "-";

        document.getElementById(
            "vegetable"
        ).textContent = "-";

        document.getElementById(
            "fruit"
        ).textContent = "-";

        document.getElementById(
            "drink"
        ).textContent = "-";

        document.getElementById(
            "updateText"
        ).textContent =
            "Menu untuk tanggal ini belum tersedia.";

        return;
    }


    /* -------------------------------------
       TAMPILKAN DATA MENU
    ------------------------------------- */

    document.getElementById(
        "menuTitle"
    ).textContent = menu.title;

    document.getElementById(
        "rice"
    ).textContent = menu.rice;

    document.getElementById(
        "mainDish"
    ).textContent = menu.mainDish;

    document.getElementById(
        "vegetable"
    ).textContent = menu.vegetable;

    document.getElementById(
        "fruit"
    ).textContent = menu.fruit;

    document.getElementById(
        "drink"
    ).textContent = menu.drink;


    /* -------------------------------------
       WAKTU UPDATE
    ------------------------------------- */

    document.getElementById(
        "updateText"
    ).textContent =
        `Terakhir diperbarui: ${menu.updated}`;
}


/* =========================================
   TOMBOL HARI SEBELUMNYA
========================================= */

document.getElementById(
    "prevDay"
).addEventListener(
    "click",
    function () {

        currentDate.setDate(
            currentDate.getDate() - 1
        );

        showMenu(currentDate);
    }
);


/* =========================================
   TOMBOL HARI BERIKUTNYA
========================================= */

document.getElementById(
    "nextDay"
).addEventListener(
    "click",
    function () {

        currentDate.setDate(
            currentDate.getDate() + 1
        );

        showMenu(currentDate);
    }
);


/* =========================================
   TAHUN FOOTER
========================================= */

document.getElementById(
    "year"
).textContent =
    new Date().getFullYear();


/* =========================================
   LOAD AWAL
========================================= */

showMenu(currentDate);
```
