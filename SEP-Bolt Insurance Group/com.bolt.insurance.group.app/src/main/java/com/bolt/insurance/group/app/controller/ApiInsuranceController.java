package com.bolt.insurance.group.app.controller;

import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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

import com.bolt.insurance.group.app.dao.InsuranceDao;
import com.bolt.insurance.group.app.dao.PersonsDao;
import com.bolt.insurance.group.app.dao.RiskDao;
import com.bolt.insurance.group.app.model.Insurance;
import com.bolt.insurance.group.app.model.Risk;
import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.service.HomeService;
import com.bolt.insurance.group.app.service.InsuranceService;
import com.bolt.insurance.group.app.service.RiskService;
import com.bolt.insurance.group.app.service.SubgroupService;
import com.bolt.insurance.group.app.util.ConverteFromModelToDto;
import com.bolt.insurance.group.app.util.DroolsFileReader;

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
	
	public ConverteFromModelToDto cfmtd = new ConverteFromModelToDto();

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

		DroolsFileReader dfr = new DroolsFileReader();
		InsuranceDao insuranceDao = new InsuranceDao();
		insuranceDao.setAmount(0.0);
		insuranceDao.setTravelInsurancePrice(0.0);
		insuranceDao.setCarInsurancePrice(0.0);
		insuranceDao.setHomeInsurancePrice(0.0);
		
		PersonsDao personDao = new PersonsDao();
		personDao.setUserUnder18(2);
		personDao.setUserBetween18And60(1);
		personDao.setUserOver60(3);
		personDao.setNumberOfUsers(6);
		personDao.setUnder18Subgroup(subgroupService.findBySubname("do 18"));
		personDao.setBetween18And60Subgroup(subgroupService.findBySubname("18 do 60"));
		personDao.setOver60Subgroup(subgroupService.findBySubname("preko 60"));
		
		insuranceDao.setPersons(personDao);
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date endDate = sdf.parse("21/12/2016");
		Date startDate = sdf.parse("15/12/2016");
		
		insuranceDao.setDays(insuranceService.calculateDays(startDate.getTime(), endDate.getTime()));
		
		Risk r1 = riskService.findOne((long) 1); //starost
		Risk r2 = riskService.findOne((long) 2); //region
		Risk r3 = riskService.findOne((long) 3); //trajanje
		Risk r4 = riskService.findOne((long) 4); //sport
		Risk r5 = riskService.findOne((long) 9); //paket
		Risk r6 = riskService.findOne((long) 5); //povrsina
		Risk r7 = riskService.findOne((long) 6); //starost_stana
		Risk r8 = riskService.findOne((long) 7); //procenjena_vrednost
		Risk r9 = riskService.findOne((long) 8); //vrsta_osiguranja
		Risk r10 = riskService.findOne((long) 10);//vrednost
		
		RiskDao rd1 = cfmtd.converteRisk(r1);
		RiskDao rd2 = cfmtd.converteRisk(r2);
		RiskDao rd3 = cfmtd.converteRisk(r3);
		RiskDao rd4 = cfmtd.converteRisk(r4);
		RiskDao rd5 = cfmtd.converteRisk(r5);
		RiskDao rd6 = cfmtd.converteRisk(r6);
		RiskDao rd7 = cfmtd.converteRisk(r7);
		RiskDao rd8 = cfmtd.converteRisk(r8);
		RiskDao rd9 = cfmtd.converteRisk(r9);
		RiskDao rd10 = cfmtd.converteRisk(r10);
		
		
		Subgroup s2 = subgroupService.findOne((long) 4); //ceo svet
		Subgroup s4 = subgroupService.findOne((long) 7);
		
		rd2.getSubgroup().add(s2);
		rd4.getSubgroup().add(s4);
		rd5.getSubgroup().add(subgroupService.findBySubname("slepanje"));
		rd5.getSubgroup().add(subgroupService.findBySubname("prevoz"));
		rd5.getSubgroup().add(subgroupService.findBySubname("popravka"));
		rd5.getSubgroup().add(subgroupService.findBySubname("smestaj"));
		rd6.getSubgroup().add(homeService.checkHouseSize(35)); //povrsina stana
		rd7.getSubgroup().add(homeService.checkHouseAge(12)); //starost stana
		rd8.getSubgroup().add(homeService.checkHouseEstimateValue(52000)); //vrednost stana
		rd9.getSubgroup().add(subgroupService.findOne((long) 24));
		rd9.getSubgroup().add(subgroupService.findOne((long) 25));
		rd10.getSubgroup().add(subgroupService.findBySubname("10000"));
		
		List<RiskDao> risks = new ArrayList<RiskDao>();
		
		risks.add(rd1);			//starost
		risks.add(rd2);			//region
		risks.add(rd3);			//trajanje
		risks.add(rd4);			//sport
		//risks.add(rd5);			//paket
		risks.add(rd6);			//povrsina
		risks.add(rd7);			//starost stana
		risks.add(rd8);			//procenjena vrednost
		risks.add(rd9);			//vrsta osiguranja
		risks.add(rd10);		//vrednost
		
		insuranceDao.setRisks(risks);
		
		StatefulKnowledgeSession ksession = dfr.getSession();  
        
        ksession.insert(insuranceDao); 
        ksession.fireAllRules();  
        ksession.dispose();	
		
        
        System.out.println("Cena bez popusta: " + insuranceDao.getPrice());
        System.out.println("Cena sa popustom: " + insuranceDao.getDiscountPrice());
        System.out.println("Cena osiguranja: " + insuranceDao.getAmount());
        
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
	public ResponseEntity<InsuranceDao> checkPrice(@RequestBody String payload){
			
		String clearPayload = Jsoup.clean(payload, Whitelist.basic());
		
		JSONObject json = new JSONObject(clearPayload);

		InsuranceDao insuranceDao = new InsuranceDao();
		PersonsDao personDao = new PersonsDao();
		
		insuranceDao.setAmount(0.0);
		insuranceDao.setCarInsurancePrice(0.0);
		insuranceDao.setHomeInsurancePrice(0.0);
		insuranceDao.setDiscountPrice(0.0);
		insuranceDao.setPrice(0.0);
		
		try {
			int kids = Integer.parseInt(json.getString("kids"));
			int grownups = Integer.parseInt(json.getString("grownups"));
			int olds = Integer.parseInt(json.getString("olds"));
			
			personDao.setUserUnder18(kids);
			personDao.setUserBetween18And60(grownups);
			personDao.setUserOver60(olds);
			personDao.setNumberOfUsers(kids + grownups + olds); 
			
			personDao.setUnder18Subgroup(subgroupService.findBySubname("do 18"));
			personDao.setBetween18And60Subgroup(subgroupService.findBySubname("18 do 60"));
			personDao.setOver60Subgroup(subgroupService.findBySubname("preko 60"));
			
			RiskDao rd1 = cfmtd.converteRisk(riskService.findOne((long) 1));
			
			insuranceDao.setPersons(personDao);
			insuranceDao.getRisks().add(rd1); //osobe
			
			String world = json.getString("world");
			RiskDao rd2 = cfmtd.converteRisk(riskService.findOne((long) 2));
			rd2.getSubgroup().add(subgroupService.findBySubname(world));
			
			insuranceDao.getRisks().add(rd2); //region
			
			long startDate = Long.parseLong(json.getString("dt1"));
			long endDate = Long.parseLong(json.getString("dt2"));
			insuranceDao.setDays(insuranceService.calculateDays(startDate, endDate));
			
			RiskDao rd3 = cfmtd.converteRisk(riskService.findOne((long) 3)); // trajanje
			
			insuranceDao.getRisks().add(rd3);
			
			String money = json.getString("money");
			RiskDao rd4 = cfmtd.converteRisk(riskService.findOne((long) 10));
			rd4.getSubgroup().add(subgroupService.findBySubname(money)); //vrednost
			
			insuranceDao.getRisks().add(rd4);
			
			boolean sport = false;
			
			try {
				sport = json.getBoolean("sportCheckBox");
			} catch (Exception e) {
				// TODO: handle exception
				sport = false;
			}
			
			if(sport){
				RiskDao rd5 = cfmtd.converteRisk(riskService.findOne((long) 4));
				rd5.getSubgroup().add(subgroupService.findBySubname(json.getJSONObject("selectedSport").getString("subname")));
				insuranceDao.getRisks().add(rd5);
			}
			
			boolean road = false;
			
			try {
				road = json.getBoolean("roadCheckBox");
			} catch (Exception e) {
				road = false;
			}
			if(road){
				RiskDao rd6 = cfmtd.converteRisk(riskService.findOne((long) 9));
				
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
				
				insuranceDao.getRisks().add(rd6); //paket
			}

			boolean home = false;
			
			try {
				home = json.getBoolean("homeCheckBox");
			} catch (Exception e) {
				home = false;
			}
			
			if(home){	
				RiskDao rd7 = cfmtd.converteRisk(riskService.findOne((long) 5)); //povrsina
				RiskDao rd8 = cfmtd.converteRisk(riskService.findOne((long) 6)); //starost_stana
				RiskDao rd9 = cfmtd.converteRisk(riskService.findOne((long) 7)); //procenjena_vrednost
				RiskDao rd10 = cfmtd.converteRisk(riskService.findOne((long) 8));//vrsta_osiguranja
				
				rd7.getSubgroup().add(homeService.checkHouseSize(Integer.parseInt(json.getString("homearea"))));
				rd9.getSubgroup().add(homeService.checkHouseEstimateValue(Integer.parseInt(json.getString("estimatedvalueofhome"))));
				
				int year = Calendar.getInstance().get(Calendar.YEAR);
				
				rd8.getSubgroup().add(homeService.checkHouseAge(year - Integer.parseInt(json.getString("ageofhome"))));
				
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
				
				insuranceDao.getRisks().add(rd7);
				insuranceDao.getRisks().add(rd8);
				insuranceDao.getRisks().add(rd9);
				insuranceDao.getRisks().add(rd10);
			}
		
			DroolsFileReader dfr = new DroolsFileReader();
			StatefulKnowledgeSession ksession = dfr.getSession();  
	        
	        ksession.insert(insuranceDao); 
	        ksession.fireAllRules();  
	        ksession.dispose();	
			
	        
	        System.out.println("Cena bez popusta: " + insuranceDao.getPrice());
	        System.out.println("Cena sa popustom: " + insuranceDao.getDiscountPrice());
	        System.out.println("Cena osiguranja: " + insuranceDao.getAmount());
			
		} catch (Exception e) {
			return new ResponseEntity<InsuranceDao>(HttpStatus.FORBIDDEN);
		}
		
		return new ResponseEntity<InsuranceDao>(insuranceDao, HttpStatus.OK);	
	}
}