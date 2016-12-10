(function() {
	'use strict';

	angular
		.module('bolt-insurance-group.i18n')
		.config(config);

	config.$inject = ['$translateProvider'];
	function config($translateProvider){
		$translateProvider.fallbackLanguage('en');
		$translateProvider.registerAvailableLanguageKeys(['en', 'sr'],{
			'en_*':'en',
			'sr_*':'sr'
		})

		$translateProvider.translations('en', {
			INTRO: "INTRO",
			WHYBOLT: "WHY BOLT?",
			SERVICESWEPROVIDED: "Services we provide",
			TESTIMONIALS: "Testimonials",
			CONTACT: "Contact",
			REMOVE: "Remove",
			BOLTINSURANCEGROUP: "Bolt insurance company",
			WELCOMETOTHEBIG : "Welcome to the BOLT INSURANCE COMPANY",
			WEAREALWAYSWITHYOU: "We are always with you",
			FORMEDIN: "Formed in December of 2003. and since then providing services for you and granting your wishes.",
			WEAREDEDICATED: "We are a dedicated group, of which only concern is your safety. Available for you 24/7 at any time of day and night. We started as small team of inspired people. But in time we have proved our qualities and thanks to you, we are one of a few insurance companies that has been approved by Software Quality Assurance.",
			WELCOMETOOUR: "Welcome to our online insurance shop.",
			TRAVELINSURANCE: "Travel insurance",
			GOINGTOTRIP: "Going to trip? This is a great chance to stay safe wherever you are going.",
			COSTUMERSSAID: "Customers said about us",
			HAVEANYCOMPLAINTS: "Any complaints? Or you just want to say a nice word for us? Dont be afraid to say anything you want. We are open for any kinds of suggestions or critics.",
			ONEMORNING: " One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
			ADDYOURCOMMENT: "Add your comment",
			CONTACTUS: "Contact us",
			EMAIL: "E-mail: ",
			PHONE: "Phone: ",
			BEALWAYSINTOUCHWITHUS: "Stay in touch with us, at any time of day or night. If you have any questions or issues, feel free to ask or send to our e-mail adress.",
			HOWLONGYOURTRIP: "How long is your trip going to be?",
			TO: "To",
			INSURANCEUSERS: "Insurance users",
			NAME: "Name",
			SURNAME: "Surname",
			ADDRESS: "Address",
			DOYOUWANTINSURANCESPORTRIKS: "Insurance against sport injuries?",
			SPORTINSURANCERISKS: "Sport insurance risks",
			CHOOSEONEOFTHESPORTS: "Choose one of the sports",
			SPORTDANGERCOEFFICIENT: "Sport danger coefficient",
			OPTIONALLYINSURANCES: "Optionally insurances",
			PARTOFWORLD: "Choose a part of world you are traveling to",
			INSUREDSUM: "Sum insured",
			PRICE: "Price",
			EUNA: "Europe and North America",
			EUNAA: "Europe, North America and Asia",
			WHOLEWORLD: "Whole world",
			HOMEINSURANCE: "Home insurance",
			INSURANCEHOMEORFLAT: "Insurance for your home or flat",
			ROADINSURANCE: "Road assistance insurance",
			INSURANCEFORROADSIDEASSISTANCE: "Insurance for road assistance",
			SUMOFINSURANCE: "Insurance premium",
			TAX: "Tax",
			FINALPRICE: "Total price",
			PLEASEENTERINFOUSER: "Please enter information for an insurance user",
			UPDATEUSERINFO: "Update information about the user {{umc.user.firstName}} &nbsp {{umc.user.surname}}",
			JMBG: "JMBG",
			PASSPORTNUMBER: "Passport number",
			OWNEROFINSURANCE: "Insurance owner",
			OK : "Save",
			CANCEL: "Cancel",
			PHONE2: "Phone number",
			EMAIL2: "E-mail",
			OWNERNAME: "Owner's name",
			OWNERSURNAME: "Owner's surname",
			OWNERJMBG: "Owner's jmbg",
			ADDRESSOFHOME: "Address of the house/flat",
			HOMEAREA: "Surface area of the house/flat",
			CONSTRUCTIONYEAR: "Year of contruction of the house/flat",
			ESTIMATEDVALUEOFHOME: "Estimated value of the house/flat",
			PLEASEENTERINFOOFHOME: "Please enter information about the flat or house",
			PLEASEENTERINFOOFVEHICLE: "Please enter information about the vehicle",
			TYPEOFVEHICLE: "Type of vehicle",
			YEAROFMANUFACTURE: "Year of manufacture",
			LICENCEPLATESNUMBER: "Licence plates number",
			NUMBEROFCHASSIS: "Number of chassis",
			OWNERNAMEFORM: "Owner's name is required",
			OWNERSURNAMEFORM: "Owner's surname is required",
			OWNERJMBGFORM: "JMBG must be 13 characters long and must consist of only digits",
			OWNERADDRESSFORM: "Owner's address is required",
			OWNERAREAFORM: "Owner's home area is required and must consist of only digits",
			OWNERAREAREQUIREDFORM: "Owner's surface area is required",
			OWNERJMBGREQUIREDFORM: "Owner's JMBG is required",
			OWNERCONSTRUCTIONYEARFORM: "Contruction year is required",
			OWNERESTIMATEDVALUEOFHOMEFORM: "Owner's estimated value of home is required",
			NAMEFORM: "Name is required",
			SURNAMEFORM: "Surname is required",
			ADDRESSFORM: "Address is required",
			PASSPORTFORM: "Passport must be between 7 and 9 characters long and must consist of only digits",
			PASSPORTFORMREQUIRED: "Passport number is required",
			PHONEFORM: "Phone number is required",
			PHONEFORMPATTERN: "Phone number must consist of only digits",
			EMAILFORM: "E-mail is required",
			VALIDEMAILFORM: "This is not a valid e-mail",
			TYPEOFVEHICLEFORM: "Type of vehicle is required",
			YEAROFMANUFACTUREFORM: "Year of manufacture must consist of 4 digits",
			LICENCEPLATESNUMBERFORM: "Licence plates number is required",
			NUMBEROFCHASSISFORM: "Number of chassis may contain up to 40 digits",
			YEAROFMANUFACTUREREQUIREDFORM : "Year of manufacture is required",
			NUMBEROFCHASSISREQUIREDFORM: "Number of chassis is required",
			OWNERCONSTRUCTIONYEARREQUIREDFORM: "Contruction year must consist of 4 digits",
			OWNERESTIMATEDVALUEOFHOMEREQUIREDFORM: "Estimated value of house may contain up to 40 digits",
			NUMBEROFINSURANCEUSERS: "Number of insurance users",
			KIDS: "Kids (<18 years)",
			GROWNUPS: "Grownups (18-60 years)",
			OLDS: "Olds (>60 years)",
			HOMEINSURACECOVERING: "Insurance for a damage on your house/flat: 1. Fire 2. Stealing 3. Flood",
			VEHICLEINSURACECOVERING: "Covering contains: 1. Towing(100 km max ) 2. Repair of vehicle(100 euros max) 3. Hotel(3 days max) 4. Alternative vehicle",
			INSURANCEFORM: "Insurance informations form",
			TOTALPRICE: "Review of insurance items and total price of your insurance",
			RISK: "Risk",
			INSURANCECOVERS: "Insurance covers",
			TOWING: "Towing",
			TOWINGCOVERS: "Towing up to 100 kilometers",
			REPAIR: "Repair of vehicle",
			REPAIRCOVERS: "Vehicle repair up to 100 euros",
			HOTEL: "Hotel",
			HOTELCOVERS: "Up to 3 days",
			ALTERNATIVEVEHICLE: "Alternative vehicle",
			ALTERNATIVEVEHICLECOVERS: "Choose an alternative vehicle for you",
			OFFERSVEHICLE: "Offers for road assistance insurance",
			STEP1: "Step 1",
			STEP2: "Step 2",
			STEP3: "Step 3",
			FIRE: "Fire",
			FLOOD: "Flood",
			THEFT: "Theft",
			EARTHSHAKE: "Earthshake",
			FIRECOVERS: "Insurance against fire in your house/flat",
			FLOODCOVERS: "Insurance againt flood in your house/flat",
			THEFTCOVERS: "Insurance against theft in your house/flat",
			EARTHSHAKECOVERS: "Insurance against earthshake",
			FIREINSURANCE: "Fire insurance",
			FLOODINSURANCE: "Flood insurance",
			THEFTINSURANCE: "Theft insurance",
			EARTHQUAKEINSURANCE: "Earthquake insurance",
			RADIOWORLD: "You have to choose a part of world you are traveling to",
			RADIOMONEY: "You have to choose how much money you want to be insured to",
			OWNERUSER: "You have to insert at least one person to be an insurance owner",
			DATEVALIDATION: "You have to enter a start date and end date of your insurance",
			SPORTCHOOSE: "You have to choose a sport",
			USERSINSURANCE: "Input of insurance users",
			NUMUSERS: "Number of users on insurance that needs to be inserted",
			INSURANCEPOLICY: "Insurance policy",
			REGION: "Region",
			EFFECTIVEDATE: "Effective date",
			SPORTCHOSEN: "Chosen sport",
			TOTALPRICETRAVEL: "Total price for travel insurance",
			PROTECTIONAGAINST: "Protection against",
			TOTALPRICEHOME: "Total price for home insurance",
			ROADASSISTANCEPACKAGE: "Includes the following protection packages",
			TOTALPRICEROAD: "Total price for road assistance",
			TOTALPRICEMONEY: "Total price of all insurances",
			INSURANCEPREMIUM: "Insurance premium",
			DISCOUNT: "Discount",
			TAX: "Tax",
			YOURPRICE: "You have to pay",
			THANKS:"Thank you for choosing Bolt.",
			PAYMENTSUCCESS:"Your transaction was successfully processed.",
			PAYMENTERRORTITLE:"Transaction failed",
			PAYMENTERRORMESSAGE:"Please try again",
			TRYAGAIN:"Try again",
			KIDSNOMORE: "You can not enter more users which have less then 18 years",
			GROWNUPSNOMORE: "You can not enter more users which have between 18 and 60 years",
			OLDSNOMORE: "You can not enter more users which are older then 60 years",
			OWNERINFO: "NOTE: The first user you enter will be an insurance OWNER.",
			VALIDJMBG: "Jmbg is not valid.",
			STEP: "Step"

				
				
						
		});
		$translateProvider.translations('sr', {
			INTRO: "Uvod",
			WHYBOLT: "Zašto Bolt?",
			REMOVE: "Obriši",
			SERVICESWEPROVIDED: "Servisi koje Vam nudimo",
			TESTIMONIALS: "Izjave",
			CONTACT: "Kontakt",
			BOLTINSURANCEGROUP: "Bolt insurance company",
			WELCOMETOTHEBIG : "Dobrodošli na BOLT INSURANCE COMPANY",
			WEAREALWAYSWITHYOU: "Mi smo uvek sa Vama",
			FORMEDIN: "Oformljeni smo 2014. godine i od tada pružamo usluge za Vas i ostvarujemo Vaše želje.",
			WEAREDEDICATED: "Mi smo posvećena grupa, koja brine o Vašoj sigurnosti. Dostupni smo 24/7, u bilo koje doba dana i noći. Počeli smo kao mali tim inspirisanih ljudi. Vremenom smo dokazali kvalitet koji posedujemo i zahvaljujući vama, mi smo jedna od osiguravajućih kompanija koja je odobrena od strane Software Qualily Assurance grupe.",
			WELCOMETOOUR: "Dobrodošli na našu online osiguravajuću prodavnicu.",
			TRAVELINSURANCE: "Putno osiguranje",
			GOINGTOTRIP: "Idete na putovanje? Ovo je sjajna prilika da budete osigurani gde god da idete.",
			COSTUMERSSAID: "Klijenti pričaju o nama",
			HAVEANYCOMPLAINTS: "Imate žalbe? Ili samo želite da kažete neku lepu reč o nama. Nemojte da se ustručavate da kažete šta želite. Mi smo otvoreni za sve vrste kritika i sugestija.",
			ONEMORNING: " One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.",
			ADDYOURCOMMENT: "Napišite Vaš komentar",
			CONTACTUS: "Kontaktirajte nas",
			EMAIL: "E-mail: ",
			PHONE: "Telefon: ",
			BEALWAYSINTOUCHWITHUS: "Budite u kontaktu sa nama, u bilo koje doba dana i noći. Ako imate neko pitanje ili problem, osećajte se slobodnim da nas pitate ili pošaljete e-mail na našu adresu.",
			HOWLONGYOURTRIP: "Koliko će trajati Vaše putovanje?",
			TO: "Do",
			INSURANCEUSERS: "Korisnici osiguranja",
			NAME: "Ime",
			SURNAME: "Prezime",
			ADDRESS: "Adresa",
			DOYOUWANTINSURANCESPORTRIKS: "Osiguranje od sportskih povreda?",
			SPORTINSURANCERISKS: "Osiguranje od sportskih povreda",
			CHOOSEONEOFTHESPORTS: "Izaberite jedan od sportova",
			SPORTDANGERCOEFFICIENT: "Koeficijent sportskog rizika",
			OPTIONALLYINSURANCES: "Opciona (dodatna) osiguranja",
			PARTOFWORLD: "Izaberite deo sveta gde putujete",
			INSUREDSUM: "Osigurana suma",
			PRICE: "Cena",
			EUNA: "Evropa i Severna Amerika",
			EUNAA: "Evropa, Severna Amerika i Azija",
			WHOLEWORLD: "Ceo svet",
			HOMEINSURANCE: "Osiguranje doma",
			INSURANCEHOMEORFLAT: "Osiguranje za Vaš stan ili kuću",
			ROADINSURANCE: "Osiguranje na putu",
			INSURANCEFORROADSIDEASSISTANCE: "Osiguranje za pomoć na putu",
			SUMOFINSURANCE: "Suma osiguranja",
			TAX: "Porez",
			FINALPRICE: "Ukupna cena osiguranja",
			PLEASEENTERINFOUSER: "Molimo unesite podatke o korisniku osiguranja",
			UPDATEUSERINFO: "Ažurirajte podatke o korisniku",
			JMBG: "JMBG",
			PASSPORTNUMBER: "Broj pasoša",
			OWNEROFINSURANCE: "Vlasnik osiguranja",
			OK : "U redu",
			CANCEL: "Odustani",
			PHONE2: "Broj telefona",
			EMAIL2: "E-mail",
			OWNERNAME: "Ime vlasnika",
			OWNERSURNAME: "Prezime vlasnika",
			OWNERJMBG: "JMBG vlasnika",
			ADDRESSOFHOME: "Adresa kuće/stana",
			HOMEAREA: "Površina kuće/stana",
			AGEOFHOME: "Starost kuće/stana",
			ESTIMATEDVALUEOFHOME: "Procenjena vrednost kuće/stana",
			PLEASEENTERINFOOFHOME: "Molimo unesite podatke o kući ili stanu",
			PLEASEENTERINFOOFVEHICLE: "Molimo unesite podatke o vozilu",
			TYPEOFVEHICLE: "Tip vozila",
			YEAROFMANUFACTURE: "Godina proizvodnje",
			LICENCEPLATESNUMBER: "Broj tablica",
			NUMBEROFCHASSIS: "Broj šasije",
			OWNERNAMEFORM: "Morate uneti naziv vlasnika",
			OWNERSURNAMEFORM: "Morate uneti prezime vlasnika",
			OWNERJMBGFORM: "JMBG mora biti dužine 13 karaktera i da sadrži samo cifre",
			OWNERADDRESSFORM: "Morate uneti adresu vlasnika",
			OWNERAREAFORM: "Površinu kuće/stana sadrži samo cifre",
			OWNERAREAREQUIREDFORM: "Morate uneti površinu kuće/stana",
			OWNERJMBGREQUIREDFORM: "Morate uneti JMBG",
			OWNERCONSTRUCTIONYEARFORM: "Morate uneti godinu izgradnje kuće/stana",
			OWNERESTIMATEDVALUEOFHOMEFORM: "Morate uneti procenjenu vrednost kuće",
			NAMEFORM: "Morate uneti ime",
			SURNAMEFORM: "Morate uneti prezime",
			ADDRESSFORM: "Morate uneti adresu",
			PASSPORTFORM: "Broj pasoša mora da sadrži od 7 do 9 cifara",
			PASSPORTFORMREQUIRED: "Morate uneti broj pasoša",
			PHONEFORM: "Morate uneti broj telefona",
			PHONEFORMPATTERN: "Broj telefona mora da sadrži samo cifre",
			EMAILFORM: "Morate uneti e-mail",
			VALIDEMAILFORM: "Uneti e-mail nije validan",
			TYPEOFVEHICLEFORM: "Morate uneti tip vozila",
			YEAROFMANUFACTUREFORM: "Godina proizvodnje mora da sadrži 4 cifre",
			YEAROFMANUFACTUREREQUIREDFORM : "Morate uneti godinu proizvodnje",
			LICENCEPLATESNUMBERFORM: "Morate uneti registarski broj tablica",
			NUMBEROFCHASSISFORM: "Broj šasije sadrži do 40 cifara",
			NUMBEROFCHASSISREQUIREDFORM: "Morate uneti broj šasije",
			OWNERCONSTRUCTIONYEARREQUIREDFORM: "Godina izgradnje kuće/stana sadrži 4 cifre",
			OWNERESTIMATEDVALUEOFHOMEREQUIREDFORM: "Procenjena vrednost kuće sadrži do 40 cifara",
			NUMBEROFINSURANCEUSERS: "Broj osiguranika",
			KIDS: "Deca (<18 godina)",
			GROWNUPS: "Odrasli (18-60 godina)",
			OLDS: "Stariji (>60 godina)",
			HOMEINSURACECOVERING: "Zaštita kuće/stana od nepogoda: 1. Požar 2. Krađa 3. Poplava",
			VEHICLEINSURACECOVERING: "Paket obuhvata: 1. Šlepovanje(do 100 kilometara ) 2. Popravka vozila(do 100 evra) 3. Smeštaj u hotelu(do 3 dana) 4. Alternativni prevoz ",
			INSURANCEFORM: "Unos podataka o osiguranju",
			TOTALPRICE: "Pregled stavki osiguranja i ukupna cena osiguranja",
			RISK: "Rizik",
			INSURANCECOVERS: "Osiguranje pokriva",
			TOWING: "Šlepovanje",
			TOWINGCOVERS: "Šlepovanje do 100 kilometara",
			REPAIR: "Popravka vozila",
			REPAIRCOVERS: "Popravka vozila do 100 evra",
			HOTEL: "Hotel",
			HOTELCOVERS: "Prenoćište do 3 dana",
			ALTERNATIVEVEHICLE: "Alternativno vozilo",
			ALTERNATIVEVEHICLECOVERS: "Izbor alternativnog vozila koje Vam odgovara",
			OFFERSVEHICLE: "Ponude koje obuhvata paket Pomoć na putu",
			STEP1: "Korak 1",
			STEP2: "Korak 2",
			STEP3: "Korak 3",
			FIRE: "Požar",
			FLOOD: "Poplava",
			THEFT: "Krađa",
			EARTHSHAKE: "Zemljotres",
			FIRECOVERS: "Osiguranje od požara u Vašoj kući/stanu",
			FLOODCOVERS: "Osiguranje od poplave u Vašoj kući/stanu",
			THEFTCOVERS: "Osiguranje od krađe u Vašoj kući/stanu",
			EARTHSHAKECOVERS: "Osiguranje od zemljotresa",
			FIREINSURANCE: "Osiguranje od požara",
			FLOODINSURANCE: "Osiguranje od poplava",
			THEFTINSURANCE: "Osiguranje od krađe",
			EARTHQUAKEINSURANCE: "Osiguranje od zemljotresa",
			RADIOWORLD: "Morate izabrati deo sveta gde putujete.",
			RADIOMONEY: "Morate izabrati količinu novca za osiguranje",
			OWNERUSER: "Morate uneti barem jednu osobu, za potrebe nosioca osiguranja",
			DATEVALIDATION: "Morate definisati trajanje putovanje",
			SPORTCHOOSE: "Morate izabrati sport",
			USERSINSURANCE: "Unos korisnika osiguranja",
			NUMUSERS: "Broj korisnika na osiguranju koje treba da uneste",
			INSURANCEPOLICY: "Polisa osiguranja",
			REGION: "Region",
			EFFECTIVEDATE: "Datum vazenja osiguranja",
			SPORTCHOSEN: "Sport koji ste izabrali",
			TOTALPRICETRAVEL: "Ukupna cena putnog osiguranja",
			PROTECTIONAGAINST: "Obuhvata zaštitu od",
			TOTALPRICEHOME: "Ukupna cena osiguranja za kuću ili stan",
			ROADASSISTANCEPACKAGE: "Obuhvata sledeće pakete zaštite",
			TOTALPRICEROAD: "Ukupna cena pomoći na putu",
			TOTALPRICEMONEY: "Ukupna cena svih osiguranja",
			INSURANCEPREMIUM: "Premija osiguranja",
			DISCOUNT: "Popust",
			TAX: "Porez",
			YOURPRICE: "Vaša cena za uplatu iznosi",
			THANKS: "Hvala što ste odabrali Bolt.",
			PAYMENTSUCCESS:"Vaša transakcija je uspešno izvršena",
			PAYMENTERRORTITLE:"Transakcija nije uspela",
			PAYMENTERRORMESSAGE:"Molimo vas da pokušate ponovo",
			TRYAGAIN:"Pokušajte ponovo",
			KIDSNOMORE: "Ne možete unositi više osobe koje imaju manje od 18 godina",
			GROWNUPSNOMORE: "Ne možete unositi više osobe koje imaju više od 18 a manje od 60 godina",
			OLDSNOMORE: "Ne možete unositi više osobe koje imaju više od 60 godina",
			OWNERINFO: "PAŽNJA: Prvi korisnik koga unesete će se smatrati za nosioca osiguranja.",
			VALIDJMBG: "JMBG nije validan.",
			STEP: "Korak"


		});

		$translateProvider.useSanitizeValueStrategy('escape');
		$translateProvider.preferredLanguage('en');
	}


})();
