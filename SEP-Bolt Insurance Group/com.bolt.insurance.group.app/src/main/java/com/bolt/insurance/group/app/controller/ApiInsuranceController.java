package com.bolt.insurance.group.app.controller;

import java.net.URISyntaxException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.ResourceBundle;

import org.drools.runtime.StatefulKnowledgeSession;
import org.json.JSONObject;
import org.jsoup.Jsoup;
import org.jsoup.safety.Whitelist;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.bolt.insurance.group.app.dto.InsuranceDto;
import com.bolt.insurance.group.app.dto.PersonsDto;
import com.bolt.insurance.group.app.dto.RiskDto;
import com.bolt.insurance.group.app.model.Home;
import com.bolt.insurance.group.app.model.Insurance;
import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.model.Type;
import com.bolt.insurance.group.app.model.User;
import com.bolt.insurance.group.app.model.UserOfInsurance;
import com.bolt.insurance.group.app.model.UserOfInsuranceId;
import com.bolt.insurance.group.app.model.Vehicle;
import com.bolt.insurance.group.app.model.VehicleType;
import com.bolt.insurance.group.app.service.DroolsService;
import com.bolt.insurance.group.app.service.HomeService;
import com.bolt.insurance.group.app.service.InsuranceService;
import com.bolt.insurance.group.app.service.MailService;
import com.bolt.insurance.group.app.service.RiskService;
import com.bolt.insurance.group.app.service.SubgroupService;
import com.bolt.insurance.group.app.service.TypeService;
import com.bolt.insurance.group.app.service.UserOfInsuranceService;
import com.bolt.insurance.group.app.service.UserService;
import com.bolt.insurance.group.app.service.VehicleService;
import com.bolt.insurance.group.app.service.VehicleTypeService;
import com.bolt.insurance.group.app.util.ConverteFromModelToDto;

@RestController
@RequestMapping(value = "/insurance")
public class ApiInsuranceController {

	@Autowired
	InsuranceService insuranceService; 
	
	@Autowired
	SubgroupService subgroupService;
	
	@Autowired
	RiskService riskService;
	
	@Autowired
	HomeService homeService;
	
	@Autowired
	DroolsService droolsService;
	
	@Autowired
	VehicleTypeService vehicleTypeService;
	
	@Autowired
	TypeService typeService;
	
	@Autowired
	VehicleService vehicleService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserOfInsuranceService userOfInsuranceService;
	
	@Autowired
	MailService mailService;
	
	public ConverteFromModelToDto cfmtd = new ConverteFromModelToDto();
	private StatefulKnowledgeSession ksession = null;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Insurance> saveInsurance(@RequestBody String payload) {

		String clearPayload = Jsoup.clean(payload, Whitelist.basic());
		
		JSONObject json = new JSONObject(clearPayload);
		Insurance insurance = new Insurance();
		
		//starost
		insurance.getRisks().add(riskService.findOne(1L));
		
		//region*****************
		Subgroup worldSubgroup = subgroupService.findBySubname(json.getString("world"));
		
		if(worldSubgroup == null){
			return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
		}
		
		insurance.getRisks().add(riskService.findOne(2L));
		insurance.getSubgroups().add(worldSubgroup); 
		
		//novac****************
		Subgroup moneySubgroup = subgroupService.findBySubname(json.getString("money"));
		
		if(moneySubgroup == null){
			return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
		}
		
		insurance.getRisks().add(riskService.findOne(10L));
		insurance.getSubgroups().add(moneySubgroup);
		
		//trajanje*************
		try {
			long startDate = Long.parseLong(json.getString("dt1"));
			long endDate = Long.parseLong(json.getString("dt2"));
			
			if(endDate < startDate){
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			
			insurance.getRisks().add(riskService.findOne(3L));
			
			insurance.setStartDate(new Date(startDate));
			insurance.setEndDate(new Date(endDate));
		} catch (Exception e) {
			return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
		}
		
		//sport
		boolean sport = false;
		
		try {
			sport = json.getBoolean("sportCheckBox");
		} catch (Exception e) {
			// TODO: handle exception
			sport = false;
		}
		
		if(sport){
			Subgroup sportSubgroup = subgroupService.findBySubname(json.getJSONObject("selectedSport").getString("subname"));
			
			//check if user select sport
			if(sportSubgroup == null){
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			
			insurance.getRisks().add(riskService.findOne(4L));
			insurance.getSubgroups().add(sportSubgroup);
		}
		
		//putno osiguranje
		boolean road = false;
		
		try {
			road = json.getBoolean("roadCheckBox");
		} catch (Exception e) {
			road = false;
		}
		
		if(road){
			boolean hotel = false;
			
			try {
				hotel = json.getBoolean("hotel");
			} catch (Exception e) {
				hotel = false;
			}
			
			boolean repair = false;
			
			try {
				repair = json.getBoolean("repair");
			} catch (Exception e) {
				repair = false;
			}
			
			boolean towing = false;
			
			try {
				towing = json.getBoolean("towing");
			} catch (Exception e) {
				towing = false;
			}
			
			boolean alternative = false;
			
			try {
				alternative = json.getBoolean("alternative");
			} catch (Exception e) {
				alternative = false;
			}
			
			if(!hotel && !repair && !towing && !alternative){
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			
			insurance.getRisks().add(riskService.findOne(9L));
			
			if(hotel){
				insurance.getSubgroups().add(subgroupService.findBySubname("smestaj"));
			}
			
			if (repair){
				insurance.getSubgroups().add(subgroupService.findBySubname("popravka"));					
			}
			
			if (towing){
				insurance.getSubgroups().add(subgroupService.findBySubname("slepanje"));					
			} 
			
			if (alternative){
				insurance.getSubgroups().add(subgroupService.findBySubname("prevoz"));
			}
			
			Vehicle vehicle = new Vehicle();
			
			try {
				if(json.getString("vehicleOwnerName").equals("") || json.getString("vehicleOwnerName") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setName(json.getString("vehicleOwnerName"));
				
				if(json.getString("vehicleOwnerSurname").equals("") || json.getString("vehicleOwnerSurname") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setSurname(json.getString("vehicleOwnerSurname"));
				
				if(json.getString("vehicleOwnerJmbg").equals("") || json.getString("vehicleOwnerJmbg") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setJmbg(json.getString("vehicleOwnerJmbg"));
				
				if(json.getString("vehiclePlates").equals("") || json.getString("vehiclePlates") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setRegistration(json.getString("vehiclePlates"));
				
				if(json.getString("vehicleChassis").equals("") || json.getString("vehicleChassis") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setChassis(json.getString("vehicleChassis"));
				
				if(json.getString("vehicleOwnerAddress").equals("") || json.getString("vehicleOwnerAddress") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setAddress(json.getString("vehicleOwnerAddress"));
				
				if(json.getString("vehicleBrand").equals("") || json.getString("vehicleBrand") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setBrand(json.getString("vehicleBrand"));
				
				VehicleType vt = vehicleTypeService.findByName(json.getString("vehicleType"));
				
				if(vt == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setType(vt);
				
				int year = Calendar.getInstance().get(Calendar.YEAR);
				long vehicleYear = Long.parseLong(json.getString("vehicleYear"));
				
				if(vehicleYear > year){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				vehicle.setYearOfProduction(vehicleYear);
				
			} catch (Exception e) {
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			vehicleService.save(vehicle);
			insurance.setVehicle(vehicle);
		}
		
		//osiguranje kuce
		boolean home = false;
		
		try {
			home = json.getBoolean("homeCheckBox");
		} catch (Exception e) {
			home = false;
		}
		
		if(home){	
			try {
				Subgroup areaSubgruop = homeService.checkHouseSize(Integer.parseInt(json.getString("homearea")));
				
				if(areaSubgruop == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				insurance.getRisks().add(riskService.findOne(5L));
				insurance.getSubgroups().add(areaSubgruop);
				
				int year = Calendar.getInstance().get(Calendar.YEAR);
				int homeYear = Integer.parseInt(json.getString("ageofhome"));
				
				if(homeYear > year){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				insurance.getRisks().add(riskService.findOne(6L));
				insurance.getSubgroups().add(homeService.checkHouseAge(year - homeYear));
				
				insurance.getRisks().add(riskService.findOne(7L));
				insurance.getSubgroups().add(homeService.checkHouseEstimateValue(Integer.parseInt(json.getString("estimatedvalueofhome"))));
			} catch (Exception e) {
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			 
			boolean theft = false;
			
			try {
				theft = json.getBoolean("theft");
			} catch (Exception e) {
				theft = false;
			}
			
			boolean flood = false;
			
			try {
				flood = json.getBoolean("flood");
			} catch (Exception e) {
				flood = false;
			}	
			
			boolean earthshaker = false;
			
			try {
				earthshaker = json.getBoolean("earthshaker");
			} catch (Exception e) {
				earthshaker = false;
			}
			
			boolean fire = false;
			
			try {
				fire = json.getBoolean("fire");
			} catch (Exception e) {
				fire = false;
			}
			
			if(!theft && !flood && !earthshaker && !fire){
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			
			insurance.getRisks().add(riskService.findOne(8L));
			
			if(theft){
				insurance.getSubgroups().add(subgroupService.findBySubname("pljacka"));
			} 
			
			if (flood){
				insurance.getSubgroups().add(subgroupService.findBySubname("poplave"));
			} 
			
			if (earthshaker){
				insurance.getSubgroups().add(subgroupService.findBySubname("zemljotres"));
			}

			if (fire){
				insurance.getSubgroups().add(subgroupService.findBySubname("pozar"));
			}
			
			Home homeInsurance = new Home();
			
			try {
				if(json.getString("homeOwnerName").equals("") || json.getString("homeOwnerName") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				homeInsurance.setName(json.getString("homeOwnerName"));
				
				if(json.getString("homeOwnerSurname").equals("") || json.getString("homeOwnerSurname") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				homeInsurance.setSurname(json.getString("homeOwnerSurname"));
				
				if(json.getString("homeOwnerJmbg").equals("") || json.getString("homeOwnerJmbg") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				homeInsurance.setJmbg(json.getString("homeOwnerJmbg"));
				
				if(json.getString("homeAdress").equals("") || json.getString("homeAdress") == null){
					return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
				}
				
				homeInsurance.setAddress(json.getString("homeAdress"));
			} catch (Exception e) {
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			homeService.save(homeInsurance);
			insurance.setHome(homeInsurance);
		}
		
		try {
			insurance.setAmount(Double.parseDouble(json.getString("amount")));
		} catch (Exception e) {
			return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
		}
		
		insurance.setType(typeService.findOne(1L));
		insuranceService.save(insurance);
		
		List<User> users = new ArrayList<User>();
		
		for(int i = 0; i < json.getJSONArray("userList").length(); i++){
			
			if(((JSONObject)(json.getJSONArray("userList").get(i))).getString("firstName").equals("") 
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("firstName") == null
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("surname").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("surname") == null
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("jmbg").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("jmbg") == null 
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("address").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("address") == null
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("passport").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("passport") == null){
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			} 
			
			if(i == 0 && (((JSONObject)(json.getJSONArray("userList").get(i))).getString("email").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("email") == null)){
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			
			users.add(new User(((JSONObject)(json.getJSONArray("userList").get(i))).getString("firstName"),
							   ((JSONObject)(json.getJSONArray("userList").get(i))).getString("surname"), 
							   ((JSONObject)(json.getJSONArray("userList").get(i))).getString("jmbg"), 
							   ((JSONObject)(json.getJSONArray("userList").get(i))).getString("address"), 
							   ((JSONObject)(json.getJSONArray("userList").get(i))).getString("passport"), 
							   ((JSONObject)(json.getJSONArray("userList").get(i))).getString("phone"), 
							   ((JSONObject)(json.getJSONArray("userList").get(i))).getString("email")));

		}
		
		
		for(int i = 0; i < users.size(); i++){
			userService.save(users.get(i));
			
			if(i == 0){
				userOfInsuranceService.save(new UserOfInsurance(new UserOfInsuranceId(users.get(i), insurance), true));
				continue;
			}
			
			userOfInsuranceService.save(new UserOfInsurance(new UserOfInsuranceId(users.get(i), insurance), false));
		}
		
		
		mailService.send(insurance);
		
		return new ResponseEntity<Insurance>(HttpStatus.CREATED);
	}

	@RequestMapping(value = "/error", method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Insurance> errorMessages(@RequestBody String payload){
		
		String clearPayload = Jsoup.clean(payload, Whitelist.basic());
		
		JSONObject json = new JSONObject(clearPayload);
		
		List<User> users = new ArrayList<User>();
		
		for(int i = 0; i < json.getJSONArray("userList").length(); i++){
			
			if(i == 0 && (((JSONObject)(json.getJSONArray("userList").get(i))).getString("email").equals("")
					|| ((JSONObject)(json.getJSONArray("userList").get(i))).getString("email") == null)){
				return new ResponseEntity<Insurance>(HttpStatus.FORBIDDEN);
			}
			
			mailService.errorMail(((JSONObject)(json.getJSONArray("userList").get(i))).getString("email"));
			
			break;
		}
		
		
		return new ResponseEntity<Insurance>(HttpStatus.OK);	
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public ResponseEntity<Insurance> getInsurance(@PathVariable Long id) {

		Insurance insurance = insuranceService.findOne(id);
		return new ResponseEntity<Insurance>(insurance, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<List<Insurance>> getInsuracnes() throws ParseException, URISyntaxException {
        
		List<Insurance> insurances = (List<Insurance>) insuranceService.findAll();
		return new ResponseEntity<List<Insurance>>(insurances, HttpStatus.OK);
	}
	
	@RequestMapping(value = "/secret", method = RequestMethod.GET)
	public ResponseEntity<InsuranceDto> getDecryptSecret() throws ParseException, URISyntaxException {
        
		InsuranceDto inDto = new InsuranceDto();
		inDto.setSecret(ResourceBundle.getBundle("application").getString("secret.cookie"));
		
		return new ResponseEntity<InsuranceDto>(inDto, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/{id}")
	public ResponseEntity<Insurance> deleteInsurance(@PathVariable("id") Long id) {

		insuranceService.delete(id);
		return new ResponseEntity<Insurance>(HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.PUT)
	public ResponseEntity<Insurance> editInsurance(@RequestBody Insurance insurance) {

		Insurance editedInsurance = insuranceService.findOne(insurance.getId());
		editedInsurance.setAmount(insurance.getAmount());
		editedInsurance.setEndDate(insurance.getEndDate());
		editedInsurance.setHome(insurance.getHome());
		editedInsurance.setRisks(insurance.getRisks());
		editedInsurance.setStartDate(insurance.getStartDate());
		editedInsurance.setType(insurance.getType());
		editedInsurance.setVehicle(insurance.getVehicle());
		return new ResponseEntity<Insurance>(editedInsurance, HttpStatus.OK);
	}
		
	@RequestMapping(value="/checkPrice", method = RequestMethod.POST)
	public ResponseEntity<InsuranceDto> checkPrice(@RequestBody String payload){
			
		String clearPayload = Jsoup.clean(payload, Whitelist.basic());
		
		JSONObject json = new JSONObject(clearPayload);

		InsuranceDto InsuranceDto = new InsuranceDto();
		PersonsDto personDto = new PersonsDto();
		
		InsuranceDto.setAmount(0.0);
		InsuranceDto.setCarInsurancePrice(0.0);
		InsuranceDto.setHomeInsurancePrice(0.0);
		InsuranceDto.setDiscountPrice(0.0);
		InsuranceDto.setPrice(0.0);
		
		personDto.setUserUnder18(0);
		personDto.setUserBetween18And60(0);
		personDto.setUserOver60(0);
		personDto.setNumberOfUsers(0); 
		
		try {
			int kids = 0;
			int grownups = 0;
			int olds = 0;
			
			//check if kids is number
			try {
				kids = Integer.parseInt(json.getString("kids"));
			} catch (Exception e) {
				
			}
	
			//check if grownups is number
			try {
				grownups = Integer.parseInt(json.getString("grownups"));
			} catch (Exception e) {
				
			}

			//check if olds is number
			try {
				olds = Integer.parseInt(json.getString("olds"));
			} catch (Exception e) {
				
			}
			
			//if kids, grownups and olds is 0 we don't have people on our insurance
			if(kids == 0 && grownups == 0 && olds == 0){
				return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
			}
			
			personDto.setUserUnder18(kids);
			personDto.setUserBetween18And60(grownups);
			personDto.setUserOver60(olds);
			personDto.setNumberOfUsers(kids + grownups + olds); 
			
			personDto.setUnder18Subgroup(subgroupService.findBySubname("do 18"));
			personDto.setBetween18And60Subgroup(subgroupService.findBySubname("18 do 60"));
			personDto.setOver60Subgroup(subgroupService.findBySubname("preko 60"));
			
			RiskDto rd1 = cfmtd.converteRisk(riskService.findOne((long) 1));
			
			InsuranceDto.setPersons(personDto);
			InsuranceDto.getRisks().add(rd1); //osobe
			
			String world = json.getString("world");
			Subgroup worldSubgroup = subgroupService.findBySubname(world);
			
			//check if user select destination
			if(worldSubgroup == null){
				return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
			}
			
			RiskDto rd2 = cfmtd.converteRisk(riskService.findOne((long) 2));
			rd2.getSubgroup().add(worldSubgroup);
			
			InsuranceDto.getRisks().add(rd2); //region
			
			long startDate = Long.parseLong(json.getString("dt1"));
			long endDate = Long.parseLong(json.getString("dt2"));
			
			//check date
			if(endDate < startDate){
				return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
			}
			
			InsuranceDto.setDays(insuranceService.calculateDays(startDate, endDate));
			RiskDto rd3 = cfmtd.converteRisk(riskService.findOne((long) 3)); // trajanje
			
			InsuranceDto.getRisks().add(rd3);
			
			String money = json.getString("money");
			Subgroup moneySubgroup = subgroupService.findBySubname(money);
			
			//check if user select money
			if(moneySubgroup == null){
				return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
			}
			
			RiskDto rd4 = cfmtd.converteRisk(riskService.findOne((long) 10));
			rd4.getSubgroup().add(moneySubgroup); //vrednost
			
			InsuranceDto.getRisks().add(rd4);
			
			boolean sport = false;
			
			try {
				sport = json.getBoolean("sportCheckBox");
			} catch (Exception e) {
				// TODO: handle exception
				sport = false;
			}
			
			if(sport){
				Subgroup sportSubgroup = subgroupService.findBySubname(json.getJSONObject("selectedSport").getString("subname"));
				
				//check if user select sport
				if(sportSubgroup == null){
					return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
				}
				
				RiskDto rd5 = cfmtd.converteRisk(riskService.findOne((long) 4));
				rd5.getSubgroup().add(sportSubgroup);
				InsuranceDto.getRisks().add(rd5);
			}
			
			boolean road = false;
			
			try {
				road = json.getBoolean("roadCheckBox");
			} catch (Exception e) {
				road = false;
			}
			
			if(road){
				RiskDto rd6 = cfmtd.converteRisk(riskService.findOne((long) 9));
				
				boolean hotel = false;
				
				try {
					hotel = json.getBoolean("hotel");
				} catch (Exception e) {
					hotel = false;
				}
				
				if(hotel){
					rd6.getSubgroup().add(subgroupService.findBySubname("smestaj"));
				}
				
				boolean repair = false;
				
				try {
					repair = json.getBoolean("repair");
				} catch (Exception e) {
					repair = false;
				}
				
				if (repair){
					rd6.getSubgroup().add(subgroupService.findBySubname("popravka"));					
				}
				
				boolean towing = false;
				
				try {
					towing = json.getBoolean("towing");
				} catch (Exception e) {
					towing = false;
				}
				
				if (towing){
					rd6.getSubgroup().add(subgroupService.findBySubname("slepanje"));					
				} 
				
				boolean alternative = false;
				
				try {
					alternative = json.getBoolean("alternative");
				} catch (Exception e) {
					alternative = false;
				}
				
				if (alternative){
					rd6.getSubgroup().add(subgroupService.findBySubname("prevoz"));
				}
				
				if(!hotel && !repair && !towing && !alternative){
					return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
				}
				
				InsuranceDto.getRisks().add(rd6); //paket
			}

			boolean home = false;
			
			try {
				home = json.getBoolean("homeCheckBox");
			} catch (Exception e) {
				home = false;
			}
			
			if(home){	
				RiskDto rd7 = cfmtd.converteRisk(riskService.findOne((long) 5)); //povrsina
				RiskDto rd8 = cfmtd.converteRisk(riskService.findOne((long) 6)); //starost_stana
				RiskDto rd9 = cfmtd.converteRisk(riskService.findOne((long) 7)); //procenjena_vrednost
				RiskDto rd10 = cfmtd.converteRisk(riskService.findOne((long) 8));//vrsta_osiguranja
				
				try {
					Subgroup areaSubgruop = homeService.checkHouseSize(Integer.parseInt(json.getString("homearea")));
					rd7.getSubgroup().add(areaSubgruop);
					
					int year = Calendar.getInstance().get(Calendar.YEAR);
					int homeYear = Integer.parseInt(json.getString("ageofhome"));
					
					if(homeYear > year){
						return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
					}
					
					rd8.getSubgroup().add(homeService.checkHouseAge(year - homeYear));
					
					rd9.getSubgroup().add(homeService.checkHouseEstimateValue(Integer.parseInt(json.getString("estimatedvalueofhome"))));
				} catch (Exception e) {
					return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
				}
				 
				boolean theft = false;
				
				try {
					theft = json.getBoolean("theft");
				} catch (Exception e) {
					theft = false;
				}
				
				if(theft){
					rd10.getSubgroup().add(subgroupService.findBySubname("pljacka"));
				} 
				
				boolean flood = false;
				
				try {
					flood = json.getBoolean("flood");
				} catch (Exception e) {
					flood = false;
				}
				
				if (flood){
					rd10.getSubgroup().add(subgroupService.findBySubname("poplave"));
				} 
				
				boolean earthshaker = false;
				
				try {
					earthshaker = json.getBoolean("earthshaker");
				} catch (Exception e) {
					earthshaker = false;
				}
				
				if (earthshaker){
					rd10.getSubgroup().add(subgroupService.findBySubname("zemljotres"));
				}
				
				boolean fire = false;
				
				try {
					fire = json.getBoolean("fire");
				} catch (Exception e) {
					fire = false;
				}
				
				if (fire){
					rd10.getSubgroup().add(subgroupService.findBySubname("pozar"));
				}
				
				if(!theft && !flood && !earthshaker && !fire){
					return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
				}
				
				InsuranceDto.getRisks().add(rd7);
				InsuranceDto.getRisks().add(rd8);
				InsuranceDto.getRisks().add(rd9);
				InsuranceDto.getRisks().add(rd10);
			}
		
			
			ksession = droolsService.getSession();

			
			System.out.println(ksession.getId() + "*************");
			ksession.insert(InsuranceDto); 
	        ksession.fireAllRules();  
	        ksession.dispose();	
	        
	        System.out.println("Cena bez popusta: " + InsuranceDto.getPrice());
	        System.out.println("Cena sa popustom: " + InsuranceDto.getDiscountPrice());
	        System.out.println("Cena osiguranja: " + InsuranceDto.getAmount());
			
		} catch (Exception e) {
			return new ResponseEntity<InsuranceDto>(HttpStatus.FORBIDDEN);
		}
		

		return new ResponseEntity<InsuranceDto>(InsuranceDto, HttpStatus.OK);	
	}
}