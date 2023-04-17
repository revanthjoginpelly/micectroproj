# Internship macro project

The internship assignment is to create a form for accceptind data from user and validatinng the user input to check that there is no emplty or blank data ,and  buttons such as  save reset,update wichh are disable at start  and store it into the JSONPOWERDB.

###Description:

   - If the primary key of that record is presnent in database it populates the  feilds with the saved information and enable only updae and reset
    
  * If the id is not present in database it enable save and reset button
  
  The three forms in project are related to:
    1. student
    2. project
    3. shipment
  
  
 ### BENFITS OF JSONPOWERDB:
   
  1 .Simplest way to retrieve data in a JSON format.
  2 .Schema-free, Simple to use, Nimble and In-Memory database.
  3   .It is built on top of one of the fastest and real-time data indexing engine - PowerIndeX.
  4 .It helps developers in faster coding, in-turn reduces development cost.

  ### Releasehistory:
   
     At the time of this project i am  using JPDB _0_3_2.2021
  
  
 ### screenshots
 #### Form 
 
 ![image](https://user-images.githubusercontent.com/115863529/232519349-cb7e62a0-aef7-4e34-9a04-3de692310bd3.png)
#### Entering Id

  1 .If Id presents it populates the data and enables the update and reset button
  
![image](https://user-images.githubusercontent.com/115863529/232520068-13d5de40-1538-4e6a-b96d-89ee13d924c0.png)

 2. If id not presents in the Database ,it enables the save and reset button
 
  ![image](https://user-images.githubusercontent.com/115863529/232520659-1bd4b288-07ae-4964-9141-c2ed8ed582e5.png)

#### reset
   
   It resets the form to original state
   
###  Relationships and Databases

 1. student : STUDENT-TABLE &SCHOOL-DB
 2. college: PROJECT-TABLE & COLLEGE-DB
 3. shipment: SHIPMENT-TABLE & DELIVERY-DB
 
 
 ### Exmaple of Databsae photo
 
 ![image](https://user-images.githubusercontent.com/115863529/232522686-0361f11e-1c35-4355-beef-af4c28696aea.png)
