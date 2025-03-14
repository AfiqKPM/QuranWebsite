let surahData = []; // Store surah data for search

// Fetch surah data from API
fetch("https://api.alquran.cloud/v1/surah")
    .then(response => response.json())
    .then(data => {
        surahData = data.data; // Store data for search
        displaySurahList(surahData); // Display all surahs
    })
    .catch(error => console.error("Error fetching data:", error));

// Display the list of surahs
function displaySurahList(surahArray) {
    let surahList = document.getElementById("surah-list");
    surahList.innerHTML = ""; // Clear list before display

    for (let i = 0; i < surahArray.length; i++) {
        let surah = surahArray[i];

        let listItem = document.createElement("li");
        listItem.innerHTML = `
            <h3>${surah.number}. ${surah.englishName}</h3>
            <p><strong>English Translation:</strong> ${surah.englishNameTranslation}</p>
            <p><strong>Number of Ayahs:</strong> ${surah.numberOfAyahs} ayat</p>
            <p><strong>Revelation Type:</strong> ${surah.revelationType}</p>
            <a href="/muslim/notes/${surah.englishName}/"><button>Notes</button></a>
            <a href="/muslim/surah/${surah.number}/"><button>View Surah</button></a> <!-- ✅ Ini jalan -->
            <hr>
        `;
        surahList.appendChild(listItem);
    }
}

// Function to search for surahs
function searchSurah() {
    let searchInput = document.getElementById("search").value.toLowerCase();
    let filteredSurah = surahData.filter(surah => 
        surah.englishName.toLowerCase().includes(searchInput)
    );
    displaySurahList(filteredSurah); // Update displayed list
}
