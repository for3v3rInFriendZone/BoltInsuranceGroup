package com.bolt.insurance.group.app.controller;

import java.net.URISyntaxException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.TimeUnit;

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

import com.bolt.insurance.group.app.droolsconf.DroolsFileReader;
import com.bolt.insurance.group.app.model.Insurance;
import com.bolt.insurance.group.app.model.Risk;
import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.model.Type;
import com.bolt.insurance.group.app.model.User;
import com.bolt.insurance.group.app.service.InsuranceService;
import com.bolt.insurance.group.app.service.NewRiskService;
import com.bolt.insurance.group.app.service.NewUserService;
import com.bolt.insurance.group.app.service.PriceService;
import com.bolt.insurance.group.app.service.RiskService;
import com.bolt.insurance.group.app.service.SubgroupService;
import com.bolt.insurance.group.app.service.TypeService;
import com.bolt.insurance.group.app.service.UserService;
import com.fasterxml.jackson.databind.jsonFormatVisitors.JsonFormatVisitorWithSerializerProvider;

@RestController
@RequestMapping(value = "/insurance")
public class ApiInsuranceController {

	@Autowired
	InsuranceService insuranceService;
	
	@Autowired
	RiskService riskService;
	
	@Autowired
	PriceService priceService;
	
	@Autowired
	SubgroupService subgroupService;
	
	@Autowired
	TypeService typeService;
	
	@Autowired
	UserService userService;
	
	@Autowired
	NewUserService newUserService;
	
	@Autowired
	NewRiskService newRiskService;

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
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		Date endDate = sdf.parse("21/12/2016");
		Date startDate = sdf.parse("15/12/2016");
		long milliseconds = endDate.getTime() - startDate.getTime();
		int days = (int) TimeUnit.DAYS.convert(milliseconds, TimeUnit.MILLISECONDS);
		
		//korisnici
		List<User> users = new ArrayList<User>();
		User u1 = userService.findOne((long) 1);
		u1.setSubgroup(newUserService.setUserSubgroup(u1.getAge()));
		User u2 = userService.findOne((long) 2);
		u2.setSubgroup(newUserService.setUserSubgroup(u2.getAge()));
		User u3 = userService.findOne((long) 3);
		u3.setSubgroup(newUserService.setUserSubgroup(u3.getAge()));
		users.add(u1);
		users.add(u2);
		users.add(u3);
		
		//tip osiguranja
		Type t1 = typeService.findOne((long) 1);
		
		//rizici osiguranja
		Risk r1 = riskService.findOne((long) 1); //starost
		Risk r2 = riskService.findOne((long) 2); //region
		Risk r3 = riskService.findOne((long) 3); //trajanje
		Risk r4 = riskService.findOne((long) 4); //sport
		Risk r5 = riskService.findOne((long) 9); //paket za auto
		Risk r6 = riskService.findOne((long) 5); //povrsina
		Risk r7 = riskService.findOne((long) 6); //starost_stana
		Risk r8 = riskService.findOne((long) 7); //procenjena_vrednost
		Risk r9 = riskService.findOne((long) 8); //vrsta_osiguranja
		
		Subgroup s2 = subgroupService.findOne((long) 4);
		
		//podgrupe rizika
		r2.getSubgroup().add(s2); //putuje u celu evropu
		r4.getSubgroup().add(subgroupService.findOne((long) 2));
		r6.getSubgroup().add(newRiskService.checkHouseSize(35)); //povrsina stana
		r7.getSubgroup().add(newRiskService.checkHouseAge(12)); //starost stana
		r8.getSubgroup().add(newRiskService.checkHouseEstimateValue(52000)); //vrednost stana
		r9.getSubgroup().add(subgroupService.findOne((long) 24));
		r9.getSubgroup().add(subgroupService.findOne((long) 25));
		//ovo treba kroz servis NewRiskService i metodu checkCarRisk
		r5.getSubgroup().add(subgroupService.findBySubname("slepanje"));
		r5.getSubgroup().add(subgroupService.findBySubname("prevoz"));
		r5.getSubgroup().add(subgroupService.findBySubname("popravka"));
		r5.getSubgroup().add(subgroupService.findBySubname("smestaj"));

		List<Risk> r = new ArrayList<Risk>();
		r.add(r1);
		r.add(r2);
		r.add(r3);
		r.add(r4);
		r.add(r5);
		r.add(r6);
		r.add(r7);
		r.add(r8);
		r.add(r9);
		
		Insurance i = new Insurance();
		i.setId(1);
		i.setStartDate(startDate);
		i.setEndDate(endDate);
		i.setAmount(0.0);
		i.setRisks(r);
		i.setType(t1);
		i.setDays(days);
		i.setUsers(users);
		
        StatefulKnowledgeSession ksession = dfr.getSession();  
        
        ksession.insert(i); 
        ksession.fireAllRules();  
        ksession.dispose();
        
        System.out.println("Amount" + i.getAmount());
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
	
	@RequestMapping(value = "/checkPrice", method = RequestMethod.POST)
	public ResponseEntity<Insurance> checkPirce(@RequestBody String postPayload){
		
		String cleanInsurance = Jsoup.clean(postPayload, Whitelist.basic());
		JSONObject jsonInsurance = new JSONObject(cleanInsurance);
		
		Insurance i = new Insurance();
		
		return new ResponseEntity<Insurance>(i, HttpStatus.OK);
	}
}
