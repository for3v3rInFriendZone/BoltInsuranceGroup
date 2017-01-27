package com.bolt.insurance.group.app.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bolt.insurance.group.app.model.Home;
import com.bolt.insurance.group.app.model.Insurance;
import com.bolt.insurance.group.app.model.Subgroup;
import com.bolt.insurance.group.app.model.Vehicle;
import com.bolt.insurance.group.app.model.VehicleType;
import com.bolt.insurance.group.app.repository.InsuranceRepository;
import com.bolt.insurance.group.app.service.HomeService;
import com.bolt.insurance.group.app.service.InsuranceService;
import com.bolt.insurance.group.app.service.RiskService;
import com.bolt.insurance.group.app.service.SubgroupService;
import com.bolt.insurance.group.app.service.TypeService;
import com.bolt.insurance.group.app.service.UserOfInsuranceService;
import com.bolt.insurance.group.app.service.UserService;
import com.bolt.insurance.group.app.service.VehicleService;
import com.bolt.insurance.group.app.service.VehicleTypeService;

@Service
public class InsuranceServiceImpl implements InsuranceService {

	@Autowired
	InsuranceRepository insuranceRepository;

	@Autowired
	SubgroupService subgroupService;

	@Autowired
	RiskService riskService;

	@Autowired
	HomeService homeService;

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

	@Override
	public Insurance save(Insurance insurance) {
		return insuranceRepository.save(insurance);
	}

	@Override
	public Insurance findOne(long id) {
		return insuranceRepository.findOne(id);
	}

	@Override
	public Iterable<Insurance> findAll() {
		return insuranceRepository.findAll();
	}

	@Override
	public void delete(long id) {
		insuranceRepository.delete(id);
	}

	@Override
	public void delete(Insurance insurance) {
		insuranceRepository.delete(insurance);
	}

	@Override
	public void deleteAll() {
		insuranceRepository.deleteAll();
	}

	@Override
	public int calculateDays(long startDate, long endDate) {
		long milliseconds = endDate - startDate;
		return (int) TimeUnit.DAYS.convert(milliseconds, TimeUnit.MILLISECONDS);
	}

	@Override
	public Insurance createInsurance(JSONObject json) {
		Insurance insurance = new Insurance();

		// starost
		insurance.getRisks().add(riskService.findOne(1L));

		// region*****************
		Subgroup worldSubgroup = subgroupService.findBySubname(json.getString("world"));

		if (worldSubgroup == null) {
			return null;
		}

		insurance.getRisks().add(riskService.findOne(2L));
		insurance.getSubgroups().add(worldSubgroup);

		// novac****************
		Subgroup moneySubgroup = subgroupService.findBySubname(json.getString("money"));

		if (moneySubgroup == null) {
			return null;
		}

		insurance.getRisks().add(riskService.findOne(10L));
		insurance.getSubgroups().add(moneySubgroup);

		// trajanje*************
		try {
			long startDate = Long.parseLong(json.getString("dt1"));
			long endDate = Long.parseLong(json.getString("dt2"));

			if (endDate < startDate) {
				return null;
			}

			insurance.getRisks().add(riskService.findOne(3L));

			insurance.setStartDate(new Date(startDate));
			insurance.setEndDate(new Date(endDate));
		} catch (Exception e) {
			return null;
		}

		// sport
		boolean sport = false;

		try {
			sport = json.getBoolean("sportCheckBox");
		} catch (Exception e) {
			// TODO: handle exception
			sport = false;
		}

		if (sport) {
			Subgroup sportSubgroup = subgroupService
					.findBySubname(json.getJSONObject("selectedSport").getString("subname"));

			// check if user select sport
			if (sportSubgroup == null) {
				return null;
			}

			insurance.getRisks().add(riskService.findOne(4L));
			insurance.getSubgroups().add(sportSubgroup);
		}

		// putno osiguranje
		boolean road = false;

		try {
			road = json.getBoolean("roadCheckBox");
		} catch (Exception e) {
			road = false;
		}

		if (road) {
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

			if (!hotel && !repair && !towing && !alternative) {
				return null;
			}

			insurance.getRisks().add(riskService.findOne(9L));

			if (hotel) {
				insurance.getSubgroups().add(subgroupService.findBySubname("smestaj"));
			}

			if (repair) {
				insurance.getSubgroups().add(subgroupService.findBySubname("popravka"));
			}

			if (towing) {
				insurance.getSubgroups().add(subgroupService.findBySubname("slepanje"));
			}

			if (alternative) {
				insurance.getSubgroups().add(subgroupService.findBySubname("prevoz"));
			}

			Vehicle vehicle = new Vehicle();

			try {
				if (json.getString("vehicleOwnerName").equals("") || json.getString("vehicleOwnerName") == null) {
					return null;
				}

				vehicle.setName(json.getString("vehicleOwnerName"));

				if (json.getString("vehicleOwnerSurname").equals("") || json.getString("vehicleOwnerSurname") == null) {
					return null;
				}

				vehicle.setSurname(json.getString("vehicleOwnerSurname"));

				if (json.getString("vehicleOwnerJmbg").equals("") || json.getString("vehicleOwnerJmbg") == null) {
					return null;
				}

				vehicle.setJmbg(json.getString("vehicleOwnerJmbg"));

				if (json.getString("vehiclePlates").equals("") || json.getString("vehiclePlates") == null) {
					return null;
				}

				vehicle.setRegistration(json.getString("vehiclePlates"));

				if (json.getString("vehicleChassis").equals("") || json.getString("vehicleChassis") == null) {
					return null;
				}

				vehicle.setChassis(json.getString("vehicleChassis"));

				if (json.getString("vehicleOwnerAddress").equals("") || json.getString("vehicleOwnerAddress") == null) {
					return null;
				}

				vehicle.setAddress(json.getString("vehicleOwnerAddress"));

				if (json.getString("vehicleBrand").equals("") || json.getString("vehicleBrand") == null) {
					return null;
				}

				vehicle.setBrand(json.getString("vehicleBrand"));

				VehicleType vt = vehicleTypeService.findByName(json.getString("vehicleType"));

				if (vt == null) {
					return null;
				}

				vehicle.setType(vt);

				int year = Calendar.getInstance().get(Calendar.YEAR);
				long vehicleYear = Long.parseLong(json.getString("vehicleYear"));

				if (vehicleYear > year) {
					return null;
				}

				vehicle.setYearOfProduction(vehicleYear);

			} catch (Exception e) {
				return null;
			}
			vehicleService.save(vehicle);
			insurance.setVehicle(vehicle);
		}

		// osiguranje kuce
		boolean home = false;

		try {
			home = json.getBoolean("homeCheckBox");
		} catch (Exception e) {
			home = false;
		}

		if (home) {
			try {
				Subgroup areaSubgruop = homeService.checkHouseSize(Integer.parseInt(json.getString("homearea")));

				if (areaSubgruop == null) {
					return null;
				}

				insurance.getRisks().add(riskService.findOne(5L));
				insurance.getSubgroups().add(areaSubgruop);

				int year = Calendar.getInstance().get(Calendar.YEAR);
				int homeYear = Integer.parseInt(json.getString("ageofhome"));

				if (homeYear > year) {
					return null;
				}

				insurance.getRisks().add(riskService.findOne(6L));
				insurance.getSubgroups().add(homeService.checkHouseAge(year - homeYear));

				insurance.getRisks().add(riskService.findOne(7L));
				insurance.getSubgroups().add(
						homeService.checkHouseEstimateValue(Integer.parseInt(json.getString("estimatedvalueofhome"))));
			} catch (Exception e) {
				return null;
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

			if (!theft && !flood && !earthshaker && !fire) {
				return null;
			}

			insurance.getRisks().add(riskService.findOne(8L));

			if (theft) {
				insurance.getSubgroups().add(subgroupService.findBySubname("pljacka"));
			}

			if (flood) {
				insurance.getSubgroups().add(subgroupService.findBySubname("poplave"));
			}

			if (earthshaker) {
				insurance.getSubgroups().add(subgroupService.findBySubname("zemljotres"));
			}

			if (fire) {
				insurance.getSubgroups().add(subgroupService.findBySubname("pozar"));
			}

			Home homeInsurance = new Home();

			try {
				if (json.getString("homeOwnerName").equals("") || json.getString("homeOwnerName") == null) {
					return null;
				}

				homeInsurance.setName(json.getString("homeOwnerName"));

				if (json.getString("homeOwnerSurname").equals("") || json.getString("homeOwnerSurname") == null) {
					return null;
				}

				homeInsurance.setSurname(json.getString("homeOwnerSurname"));

				if (json.getString("homeOwnerJmbg").equals("") || json.getString("homeOwnerJmbg") == null) {
					return null;
				}

				homeInsurance.setJmbg(json.getString("homeOwnerJmbg"));

				if (json.getString("homeAdress").equals("") || json.getString("homeAdress") == null) {
					return null;
				}

				homeInsurance.setAddress(json.getString("homeAdress"));
			} catch (Exception e) {
				return null;
			}
			homeService.save(homeInsurance);
			insurance.setHome(homeInsurance);
		}

		try {
			insurance.setAmount(Double.parseDouble(json.getString("amount")));
		} catch (Exception e) {
			return null;
		}

		insurance.setType(typeService.findOne(1L));
		
		return insurance;
	}

}
