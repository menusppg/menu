/* =========================================
   VARIABEL
========================================= */

const now = new Date();

let currentDate = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
);


/* =========================================
   FORMAT TANGGAL
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

    return {
        dayName: days[date.getDay()],

        fullDate:
            `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`
    };
}


/* =========================================
   BACA FILE INFORMASI SESUAI TANGGAL
========================================= */

async function loadMenuData(date) {

    const day = String(
        date.getDate()
    ).padStart(2, "0");

    const month = String(
        date.getMonth() + 1
    ).padStart(2, "0");

    const year =
        date.getFullYear();

    const filePath =
        `informasi/${day} - ${month} - ${year}.txt`;


    console.log(
        "Mencari file:",
        filePath
    );


    try {

        const response =
            await fetch(filePath);


        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}`
            );
        }


        const text =
            await response.text();


        const data =
            JSON.parse(text);


        /*
         * File TXT berisi:
         *
         * {
         *     "2026-09-11": {
         *         ...
         *     }
         * }
         *
         * Jadi kita ambil berdasarkan
         * tanggal yang sedang dipilih.
         */

        const key =
            formatDateKey(date);


        return data[key] || null;


    } catch (error) {

        console.log(
            "Data tidak ditemukan:",
            filePath
        );

        console.log(
            "Error:",
            error
        );

        return null;
    }
}


/* =========================================
   TAMPILKAN MENU
========================================= */

async function showMenu(date) {

    /* -------------------------------------
       TANGGAL
    ------------------------------------- */

    const formatted =
        formatDateIndonesia(date);


    document.getElementById(
        "dayName"
    ).textContent =
        formatted.dayName;


    document.getElementById(
        "dateText"
    ).textContent =
        formatted.fullDate;


    /* -------------------------------------
       BACA DATA TXT
    ------------------------------------- */

    const menu =
        await loadMenuData(date);


    /* -------------------------------------
       GAMBAR OTOMATIS SESUAI TANGGAL

       Format:
       DD - MM - YYYY.jpeg
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


    const image =
        document.getElementById(
            "menuImage"
        );


    const placeholder =
        document.getElementById(
            "imagePlaceholder"
        );


    /* -------------------------------------
       LOAD GAMBAR
    ------------------------------------- */

    image.onload = function () {

        image.style.display =
            "block";

        placeholder.style.display =
            "none";

    };


    image.onerror = function () {

        image.style.display =
            "none";

        placeholder.style.display =
            "flex";

    };


    image.style.display =
        "block";

    placeholder.style.display =
        "none";


    image.src =
        imagePath;


    /* -------------------------------------
       JIKA DATA TXT TIDAK ADA
    ------------------------------------- */

    if (!menu) {

        /* MENU */

        document.getElementById(
            "menuTitle"
        ).textContent =
            "Menu Belum Tersedia";


        document.getElementById(
            "rice"
        ).textContent =
            "-";


        document.getElementById(
            "mainDish"
        ).textContent =
            "-";


        document.getElementById(
            "vegetable"
        ).textContent =
            "-";


        document.getElementById(
            "fruit"
        ).textContent =
            "-";


        document.getElementById(
            "drink"
        ).textContent =
            "-";


        /* GIZI */

        document.getElementById(
            "energySmall"
        ).textContent =
            "-";

        document.getElementById(
            "energyLarge"
        ).textContent =
            "-";


        document.getElementById(
            "proteinSmall"
        ).textContent =
            "-";

        document.getElementById(
            "proteinLarge"
        ).textContent =
            "-";


        document.getElementById(
            "fatSmall"
        ).textContent =
            "-";

        document.getElementById(
            "fatLarge"
        ).textContent =
            "-";


        document.getElementById(
            "carbohydrateSmall"
        ).textContent =
            "-";

        document.getElementById(
            "carbohydrateLarge"
        ).textContent =
            "-";


        document.getElementById(
            "fiberSmall"
        ).textContent =
            "-";

        document.getElementById(
            "fiberLarge"
        ).textContent =
            "-";


        /* STATUS */

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
    ).textContent =
        menu.title;


    document.getElementById(
        "rice"
    ).textContent =
        menu.rice;


    document.getElementById(
        "mainDish"
    ).textContent =
        menu.mainDish;


    document.getElementById(
        "vegetable"
    ).textContent =
        menu.vegetable;


    document.getElementById(
        "fruit"
    ).textContent =
        menu.fruit;


    document.getElementById(
        "drink"
    ).textContent =
        menu.drink;


    /* -------------------------------------
       DATA GIZI
    ------------------------------------- */

    document.getElementById(
        "energySmall"
    ).textContent =
        menu.nutrition?.energy?.small || "-";


    document.getElementById(
        "energyLarge"
    ).textContent =
        menu.nutrition?.energy?.large || "-";


    document.getElementById(
        "proteinSmall"
    ).textContent =
        menu.nutrition?.protein?.small || "-";


    document.getElementById(
        "proteinLarge"
    ).textContent =
        menu.nutrition?.protein?.large || "-";


    document.getElementById(
        "fatSmall"
    ).textContent =
        menu.nutrition?.fat?.small || "-";


    document.getElementById(
        "fatLarge"
    ).textContent =
        menu.nutrition?.fat?.large || "-";


    document.getElementById(
        "carbohydrateSmall"
    ).textContent =
        menu.nutrition?.carbohydrate?.small || "-";


    document.getElementById(
        "carbohydrateLarge"
    ).textContent =
        menu.nutrition?.carbohydrate?.large || "-";


    document.getElementById(
        "fiberSmall"
    ).textContent =
        menu.nutrition?.fiber?.small || "-";


    document.getElementById(
        "fiberLarge"
    ).textContent =
        menu.nutrition?.fiber?.large || "-";


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

const prevDayButton =
    document.getElementById(
        "prevDay"
    );


if (prevDayButton) {

    prevDayButton.addEventListener(
        "click",
        function () {

            currentDate.setDate(
                currentDate.getDate() - 1
            );


            showMenu(
                currentDate
            );

        }
    );

}


/* =========================================
   TOMBOL HARI BERIKUTNYA
========================================= */

const nextDayButton =
    document.getElementById(
        "nextDay"
    );


if (nextDayButton) {

    nextDayButton.addEventListener(
        "click",
        function () {

            currentDate.setDate(
                currentDate.getDate() + 1
            );


            showMenu(
                currentDate
            );

        }
    );

}


/* =========================================
   TAHUN FOOTER
========================================= */

const yearElement =
    document.getElementById(
        "year"
    );


if (yearElement) {

    yearElement.textContent =
        new Date().getFullYear();

}


/* =========================================
   LOAD AWAL
========================================= */

showMenu(
    currentDate
);
