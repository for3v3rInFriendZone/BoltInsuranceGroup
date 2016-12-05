package com.bolt.insurance.group.app.controller;

import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.drools.runtime.StatefulKnowledgeSession;
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
import com.bolt.insurance.group.app.util.ConverteFromDaoToModel;
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
		
		insuranceDao.setDays(insuranceService.calculateDays(startDate, endDate));
		
		Risk r1 = riskService.findOne((long) 1); //starost
		Risk r2 = riskService.findOne((long) 2); //region
		Risk r3 = riskService.findOne((long) 3); //trajanje
		Risk r4 = riskService.findOne((long) 4); //sport
		Risk r5 = riskService.findOne((long) 9); //paket
		Risk r6 = riskService.findOne((long) 5); //povrsina
		Risk r7 = riskService.findOne((long) 6); //starost_stana
		Risk r8 = riskService.findOne((long) 7); //procenjena_vrednost
		Risk r9 = riskService.findOne((long) 8); //vrsta_osiguranja
		
		RiskDao rd1 = cfmtd.converteRisk(r1);
		RiskDao rd2 = cfmtd.converteRisk(r2);
		RiskDao rd3 = cfmtd.converteRisk(r3);
		RiskDao rd4 = cfmtd.converteRisk(r4);
		RiskDao rd5 = cfmtd.converteRisk(r5);
		RiskDao rd6 = cfmtd.converteRisk(r6);
		RiskDao rd7 = cfmtd.converteRisk(r7);
		RiskDao rd8 = cfmtd.converteRisk(r8);
		RiskDao rd9 = cfmtd.converteRisk(r9);
		
		
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
		
		List<RiskDao> risks = new ArrayList<RiskDao>();
		
		risks.add(rd1);
		risks.add(rd2);
		risks.add(rd3);
		//risks.add(rd4);
		risks.add(rd5);
		risks.add(rd6);
		risks.add(rd7);
		risks.add(rd8);
		risks.add(rd9);
		
		insuranceDao.setRisks(risks);
		
		StatefulKnowledgeSession ksession = dfr.getSession();  
        
        ksession.insert(insuranceDao); 
        ksession.fireAllRules();  
        ksession.dispose();	
		
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
	public ResponseEntity<Double> checkPrice(@RequestBody String payload){
			
		return null;	
	}
}