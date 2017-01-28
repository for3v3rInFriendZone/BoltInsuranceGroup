package com.bolt.insurance.group.app.service.impl;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Insurance;
import com.bolt.insurance.group.app.model.User;
import com.bolt.insurance.group.app.model.UserOfInsurance;
import com.bolt.insurance.group.app.service.MailService;
import com.bolt.insurance.group.app.service.UserOfInsuranceService;

import scala.math.BigInt;

@Service
public class MailServiceImpl implements MailService{

	@Autowired
	JavaMailSender mailSender;
	
	@Autowired
	UserOfInsuranceService userOfInsuranceService;
	
	@PersistenceContext
	EntityManager em;
	
	@Override
	public void send(Insurance insurance) {
		ArrayList<UserOfInsurance> users = (ArrayList<UserOfInsurance>) userOfInsuranceService.findAll();
	
		Query query = em.createNamedQuery("findUsers").setParameter("id", insurance.getId());
		users = (ArrayList<UserOfInsurance>) query.getResultList();
		
		MimeMessage mail = mailSender.createMimeMessage();
		
		try {
			SimpleDateFormat sdf = new SimpleDateFormat("dd.MM.yyyy");
			String messages = "Dear, "; 
			
			MimeMessageHelper helper = new MimeMessageHelper(mail, true);
			
			for(int i = 0; i < users.size(); i++){
				if(users.get(i).isOwner()){
					helper.setTo(users.get(i).getUserOfInsuranceId().getUser().getMail());
					messages = messages + users.get(i).getUserOfInsuranceId().getUser().getFirstName() + " " + users.get(i).getUserOfInsuranceId().getUser().getSurname();
					break;
				}
			}
			
			messages = messages + System.lineSeparator() + System.lineSeparator() + "We wish to inform you that your purchase was SUCCESSFUL." + System.lineSeparator();
			
			messages = messages + System.lineSeparator() + "You are traveling from: " + sdf.format(insurance.getStartDate()) + " to " + sdf.format(insurance.getEndDate()) + "." + System.lineSeparator();
			
			messages = messages + System.lineSeparator() + "Your risks are: " + System.lineSeparator() + System.lineSeparator();
			
			for(int i = 0; i < insurance.getSubgroups().size(); i++){
				if(insurance.getSubgroups().get(i).getRisk().getName().equals("region")){
					if(insurance.getSubgroups().get(i).getSubname().equals("EUNA")){
						messages = messages + "Risk: region and subgroup - Europe and North America" + System.lineSeparator();
					}else if(insurance.getSubgroups().get(i).getSubname().equals("EUNAA")){
						messages = messages + "Risk: region and subgroup - Europe, North America and Asia" + System.lineSeparator();
					}else if(insurance.getSubgroups().get(i).getSubname().equals("WHOLEWORLD")){
						messages = messages + "Risk: region and subgroup - Whole world" + System.lineSeparator();
					}
				}else if(insurance.getSubgroups().get(i).getRisk().getName().equals("sport")){
					messages = messages + "Risk: sport and subgroup - " + insurance.getSubgroups().get(i).getSubname() + System.lineSeparator();
				}
			}
			
			if(insurance.getHome() != null){
				messages = messages + System.lineSeparator() + "Home insurance: " + System.lineSeparator() + System.lineSeparator();
				for(int i = 0; i < insurance.getSubgroups().size(); i++){
					if(insurance.getSubgroups().get(i).getRisk().getName().equals("povrsina")){
						messages = messages + "Risk: povrsina " + insurance.getSubgroups().get(i).getSubname() + System.lineSeparator(); 
					}else if(insurance.getSubgroups().get(i).getRisk().getName().equals("starost_stana")){
						messages = messages + "Risk: starost stana " + insurance.getSubgroups().get(i).getSubname() + System.lineSeparator(); 
					}else if(insurance.getSubgroups().get(i).getRisk().getName().equals("procenjena_vrednost")){
						messages = messages + "Risk: procenjena vrednost " + insurance.getSubgroups().get(i).getSubname() + System.lineSeparator(); 
					}else if(insurance.getSubgroups().get(i).getRisk().getName().equals("vrsta_osiguranja")){
						messages = messages + "Risk: vrsta osiguranja - " + insurance.getSubgroups().get(i).getSubname() + System.lineSeparator();
					}
				}
				
				messages = messages + "Home owner: " + insurance.getHome().getName() + " " + insurance.getHome().getSurname() + " jmbg: " + insurance.getHome().getJmbg() + " address: " + insurance.getHome().getAddress() + System.lineSeparator();
			}
			
			if(insurance.getVehicle() != null){
				messages = messages + System.lineSeparator() + "Vehicle insurance: " + System.lineSeparator();
				for(int i = 0; i < insurance.getSubgroups().size(); i++){
					if(insurance.getSubgroups().get(i).getRisk().getName().equals("paket")){
						messages = messages + "Risk: paket " + insurance.getSubgroups().get(i).getSubname() + System.lineSeparator();
					}
				}
				messages = messages + "Vehicle owner: " + insurance.getVehicle().getName() + " " + insurance.getVehicle().getSurname() + " jmbg: " + insurance.getVehicle().getJmbg() + System.lineSeparator();
				messages = messages + "Vehicle information " + System.lineSeparator();
				messages = messages + "Vehicle type: " + insurance.getVehicle().getType().getName() + System.lineSeparator();
				messages = messages + "Vehicle brand: " + insurance.getVehicle().getBrand() + System.lineSeparator();
				messages = messages + "Vehicle chassies: " + insurance.getVehicle().getChassis() + System.lineSeparator();
				messages = messages + "Vehicle registration: " + insurance.getVehicle().getRegistration() + System.lineSeparator();
				messages = messages + "Vehicle year of production: " + insurance.getVehicle().getYearOfProduction() + System.lineSeparator();
			}
			
			messages = messages + System.lineSeparator() + "People on insurance: " + System.lineSeparator() + System.lineSeparator();
			
			for(int i = 0; i < users.size(); i++){
				messages = messages + "Name: " + users.get(i).getUserOfInsuranceId().getUser().getFirstName() + " " + users.get(i).getUserOfInsuranceId().getUser().getSurname() + " Jmbg: " + users.get(i).getUserOfInsuranceId().getUser().getJmbg() + " Passport number: " + users.get(i).getUserOfInsuranceId().getUser().getPassport() + System.lineSeparator(); 
			}
			
			messages = messages + System.lineSeparator() + "All the best, " + System.lineSeparator() + "Bolt Insurance Team";
			
			helper.setFrom("acquirersep@gmail.com");
			helper.setSubject("Successful purchase");
			helper.setText(messages);
	         
			mailSender.send(mail);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

	@Override
	public void errorMail(String email) {
		String messages = "Dear, " + System.lineSeparator() + "We wish to inform you that your purchase was UNSUCCESSFUL, please try again." + System.lineSeparator() + "All the best," + System.lineSeparator() + "Bolt Insurance Team";
		MimeMessage mail = mailSender.createMimeMessage();
		try {
			MimeMessageHelper helper = new MimeMessageHelper(mail, true);
			helper.setTo(email);
			helper.setFrom("acquirersep@gmail.com");
			helper.setSubject("Unseccessful purchase");
			helper.setText(messages);
			mailSender.send(mail);
		} catch (MessagingException e) {
			e.printStackTrace();
		}
	}

}
