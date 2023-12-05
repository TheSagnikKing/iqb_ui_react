//Barber Action:

1. /barber/getAllBarberBySalonId
2. /barber/registerBarberByAdmin
3. /barber/updateBarberByEmail
4. /barber/getBarberServicesByBarberId?barberId=${barberId}
5. /barber/getAllBarbersByServiceId?serviceId=12
6. /barber/getAllBarberBySalonId

//Join Queue Action

1. /queue/singleJoinQueue
2. /queue/getQListBySalonId?salonId=${salonid}
3. /queue/autoJoin
4. /queue/barberServedQueue

//Salon Action

1. /salon/createSalon 
3. /salon/updateSalonBySalonIdAndAdminEmail
4. /salon/allSalonServices?salonId=${salonid}
5. /salon/getAllSalonsByAdminEmail
6. /salon/allSalonServices?salonId=11

//Customer Action

1. /customer/getAllCustomers


//Logout clear cookie problem