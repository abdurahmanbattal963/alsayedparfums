export interface Country {
  code: string;
  nameEn: string;
  nameAr: string;
  phoneCode: string;
  regions?: string[];
}

export const countries: Country[] = [
  { code: "SY", nameEn: "Syria", nameAr: "سوريا", phoneCode: "+963", regions: ["Damascus", "Aleppo", "Homs", "Hama", "Latakia", "Tartus", "Deir ez-Zor", "Raqqa", "Hasakah", "Idlib", "Daraa", "Suwayda", "Quneitra", "Damascus Countryside"] },
  { code: "AE", nameEn: "United Arab Emirates", nameAr: "الإمارات العربية المتحدة", phoneCode: "+971", regions: ["Abu Dhabi", "Dubai", "Sharjah", "Ajman", "Umm Al Quwain", "Ras Al Khaimah", "Fujairah"] },
  { code: "SA", nameEn: "Saudi Arabia", nameAr: "المملكة العربية السعودية", phoneCode: "+966", regions: ["Riyadh", "Jeddah", "Mecca", "Medina", "Dammam", "Khobar", "Tabuk", "Abha"] },
  { code: "EG", nameEn: "Egypt", nameAr: "مصر", phoneCode: "+20", regions: ["Cairo", "Alexandria", "Giza", "Sharm El Sheikh", "Luxor", "Aswan", "Hurghada"] },
  { code: "JO", nameEn: "Jordan", nameAr: "الأردن", phoneCode: "+962", regions: ["Amman", "Irbid", "Zarqa", "Aqaba", "Madaba", "Jerash"] },
  { code: "LB", nameEn: "Lebanon", nameAr: "لبنان", phoneCode: "+961", regions: ["Beirut", "Tripoli", "Sidon", "Tyre", "Byblos", "Jounieh"] },
  { code: "IQ", nameEn: "Iraq", nameAr: "العراق", phoneCode: "+964", regions: ["Baghdad", "Basra", "Erbil", "Mosul", "Sulaymaniyah", "Kirkuk", "Najaf", "Karbala"] },
  { code: "KW", nameEn: "Kuwait", nameAr: "الكويت", phoneCode: "+965", regions: ["Kuwait City", "Hawalli", "Salmiya", "Jahra", "Farwaniya"] },
  { code: "QA", nameEn: "Qatar", nameAr: "قطر", phoneCode: "+974", regions: ["Doha", "Al Wakrah", "Al Khor", "Dukhan", "Mesaieed"] },
  { code: "BH", nameEn: "Bahrain", nameAr: "البحرين", phoneCode: "+973", regions: ["Manama", "Riffa", "Muharraq", "Hamad Town", "Isa Town"] },
  { code: "OM", nameEn: "Oman", nameAr: "عُمان", phoneCode: "+968", regions: ["Muscat", "Salalah", "Sohar", "Nizwa", "Sur"] },
  { code: "YE", nameEn: "Yemen", nameAr: "اليمن", phoneCode: "+967", regions: ["Sanaa", "Aden", "Taiz", "Hodeidah", "Mukalla"] },
  { code: "PS", nameEn: "Palestine", nameAr: "فلسطين", phoneCode: "+970", regions: ["Gaza", "Ramallah", "Hebron", "Nablus", "Bethlehem", "Jenin"] },
  { code: "LY", nameEn: "Libya", nameAr: "ليبيا", phoneCode: "+218", regions: ["Tripoli", "Benghazi", "Misrata", "Sabha", "Tobruk"] },
  { code: "TN", nameEn: "Tunisia", nameAr: "تونس", phoneCode: "+216", regions: ["Tunis", "Sfax", "Sousse", "Kairouan", "Bizerte"] },
  { code: "DZ", nameEn: "Algeria", nameAr: "الجزائر", phoneCode: "+213", regions: ["Algiers", "Oran", "Constantine", "Annaba", "Blida"] },
  { code: "MA", nameEn: "Morocco", nameAr: "المغرب", phoneCode: "+212", regions: ["Casablanca", "Rabat", "Marrakech", "Fes", "Tangier", "Agadir"] },
  { code: "SD", nameEn: "Sudan", nameAr: "السودان", phoneCode: "+249", regions: ["Khartoum", "Omdurman", "Port Sudan", "Kassala", "Nyala"] },
  { code: "TR", nameEn: "Turkey", nameAr: "تركيا", phoneCode: "+90", regions: ["Istanbul", "Ankara", "Izmir", "Antalya", "Bursa", "Gaziantep"] },
  { code: "US", nameEn: "United States", nameAr: "الولايات المتحدة", phoneCode: "+1" },
  { code: "GB", nameEn: "United Kingdom", nameAr: "المملكة المتحدة", phoneCode: "+44" },
  { code: "DE", nameEn: "Germany", nameAr: "ألمانيا", phoneCode: "+49" },
  { code: "FR", nameEn: "France", nameAr: "فرنسا", phoneCode: "+33" },
  { code: "IT", nameEn: "Italy", nameAr: "إيطاليا", phoneCode: "+39" },
  { code: "ES", nameEn: "Spain", nameAr: "إسبانيا", phoneCode: "+34" },
  { code: "NL", nameEn: "Netherlands", nameAr: "هولندا", phoneCode: "+31" },
  { code: "BE", nameEn: "Belgium", nameAr: "بلجيكا", phoneCode: "+32" },
  { code: "SE", nameEn: "Sweden", nameAr: "السويد", phoneCode: "+46" },
  { code: "NO", nameEn: "Norway", nameAr: "النرويج", phoneCode: "+47" },
  { code: "DK", nameEn: "Denmark", nameAr: "الدنمارك", phoneCode: "+45" },
  { code: "CH", nameEn: "Switzerland", nameAr: "سويسرا", phoneCode: "+41" },
  { code: "AT", nameEn: "Austria", nameAr: "النمسا", phoneCode: "+43" },
  { code: "AU", nameEn: "Australia", nameAr: "أستراليا", phoneCode: "+61" },
  { code: "CA", nameEn: "Canada", nameAr: "كندا", phoneCode: "+1" },
  { code: "JP", nameEn: "Japan", nameAr: "اليابان", phoneCode: "+81" },
  { code: "CN", nameEn: "China", nameAr: "الصين", phoneCode: "+86" },
  { code: "IN", nameEn: "India", nameAr: "الهند", phoneCode: "+91" },
  { code: "PK", nameEn: "Pakistan", nameAr: "باكستان", phoneCode: "+92" },
  { code: "BD", nameEn: "Bangladesh", nameAr: "بنغلاديش", phoneCode: "+880" },
  { code: "MY", nameEn: "Malaysia", nameAr: "ماليزيا", phoneCode: "+60" },
  { code: "ID", nameEn: "Indonesia", nameAr: "إندونيسيا", phoneCode: "+62" },
  { code: "SG", nameEn: "Singapore", nameAr: "سنغافورة", phoneCode: "+65" },
  { code: "PH", nameEn: "Philippines", nameAr: "الفلبين", phoneCode: "+63" },
  { code: "TH", nameEn: "Thailand", nameAr: "تايلاند", phoneCode: "+66" },
  { code: "VN", nameEn: "Vietnam", nameAr: "فيتنام", phoneCode: "+84" },
  { code: "KR", nameEn: "South Korea", nameAr: "كوريا الجنوبية", phoneCode: "+82" },
  { code: "ZA", nameEn: "South Africa", nameAr: "جنوب أفريقيا", phoneCode: "+27" },
  { code: "NG", nameEn: "Nigeria", nameAr: "نيجيريا", phoneCode: "+234" },
  { code: "KE", nameEn: "Kenya", nameAr: "كينيا", phoneCode: "+254" },
  { code: "BR", nameEn: "Brazil", nameAr: "البرازيل", phoneCode: "+55" },
  { code: "MX", nameEn: "Mexico", nameAr: "المكسيك", phoneCode: "+52" },
  { code: "AR", nameEn: "Argentina", nameAr: "الأرجنتين", phoneCode: "+54" },
  { code: "CO", nameEn: "Colombia", nameAr: "كولومبيا", phoneCode: "+57" },
  { code: "CL", nameEn: "Chile", nameAr: "تشيلي", phoneCode: "+56" },
  { code: "RU", nameEn: "Russia", nameAr: "روسيا", phoneCode: "+7" },
  { code: "UA", nameEn: "Ukraine", nameAr: "أوكرانيا", phoneCode: "+380" },
  { code: "PL", nameEn: "Poland", nameAr: "بولندا", phoneCode: "+48" },
  { code: "CZ", nameEn: "Czech Republic", nameAr: "جمهورية التشيك", phoneCode: "+420" },
  { code: "GR", nameEn: "Greece", nameAr: "اليونان", phoneCode: "+30" },
  { code: "PT", nameEn: "Portugal", nameAr: "البرتغال", phoneCode: "+351" },
  { code: "IR", nameEn: "Iran", nameAr: "إيران", phoneCode: "+98" },
  { code: "AF", nameEn: "Afghanistan", nameAr: "أفغانستان", phoneCode: "+93" },
];

export const getCountryByCode = (code: string): Country | undefined => {
  return countries.find(c => c.code === code);
};

export const getRegionsByCountry = (countryCode: string): string[] => {
  const country = countries.find(c => c.code === countryCode);
  return country?.regions || [];
};
