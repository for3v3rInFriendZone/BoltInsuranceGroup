package com.bolt.insurance.group.app.controller;

import java.net.URISyntaxException;
import java.text.ParseException;
import java.util.Calendar;
import java.util.List;

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
import com.bolt.insurance.group.app.model.Insurance;
import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.service.DroolsService;
import com.bolt.insurance.group.app.service.HomeService;
import com.bolt.insurance.group.app.service.InsuranceService;
import com.bolt.insurance.group.app.service.RiskService;
import com.bolt.insurance.group.app.service.SubgroupService;
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
	
	public ConverteFromModelToDto cfmtd = new ConverteFromModelToDto();
	private StatefulKnowledgeSession ksession = null;

	@RequestMapping(method = RequestMethod.POST, consumes = "application/json")
	public ResponseEntity<Insurance> saveInsurance(@RequestBody Insurance insurance) {

		Insurance newInsurance = insuranceService.save(insurance);
		return new ResponseEntity<Insurance>(newInsurance, HttpStatus.CREATED);
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