package com.example.Services;

import com.example.Config.HistoryRegistrations;
import com.example.Config.Language;
import com.example.Config.MySQLConfig;
import com.example.Config.User;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class NewService {
    Language language = new Language();


    //Get Lithuanian texts
    @RequestMapping("/lt")
    public Map<String,String> getLanguageLT() {

        language.getLT();
        //language.fieldsNames.get("name");

        return language.fieldsNames;
    }

    //Get English texts
    @RequestMapping("/en")
    public Map<String,String> getLanguageEN() {

        language.getEN();
        //language.fieldsNames.get("name");

        return language.fieldsNames;
    }

    // SQL testing
    @RequestMapping(value = "/insert", method = RequestMethod.GET)
    public void doSmth(String id, String name, String surname) {
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();
        mySQLConfig.insertTest(Integer.parseInt(id),name,surname);
        mySQLConfig.closeConnection();
    }

    // SQL testing
    @RequestMapping(value = "/US1/{id}/{name}/{surname}", method = RequestMethod.PUT)
    public void putInTest(@PathVariable String id, @PathVariable String name, @PathVariable String surname) {
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();
        mySQLConfig.insertTest(Integer.parseInt(id),name,surname);
        mySQLConfig.closeConnection();
    }

    // PUT DATA IN REGISTRATIONS TABLE
    @RequestMapping(value = "/US2/{name}/{surname}/{tel}/{email}/{bank}/{date}/{time}/{subject}/{message}", method = RequestMethod.PUT)
    public void putInRegistrations(
            @PathVariable String name, @PathVariable String surname, @PathVariable String tel,
            @PathVariable String email, @PathVariable String bank, @PathVariable String date,
            @PathVariable String time, @PathVariable String subject, @PathVariable String message)
    {
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();

        date += " " + time;

        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        Date parsed = null;
        try {
            parsed = format.parse(date);
        } catch (ParseException e) {
            e.printStackTrace();
        }

        java.sql.Date sqlDate = new java.sql.Date(parsed.getTime());
        java.sql.Time sqlTime = new java.sql.Time(parsed.getTime());

        mySQLConfig.insertRegistrations(1,name,surname,tel,email,bank,sqlDate,sqlTime,subject,message);
        mySQLConfig.closeConnection();
    }

    // PUT DATA IN CONTACTS TABLE
    @RequestMapping(value = "/US3/{theme}/{InputMessage}/{first_name}/{last_name}/{phone_number}/{email}/{answer}", method = RequestMethod.PUT)
    public void putInContacts(
            @PathVariable String theme, @PathVariable String InputMessage, @PathVariable String first_name,
            @PathVariable String last_name, @PathVariable String phone_number, @PathVariable String email,
            @PathVariable String answer)
    {
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();
        mySQLConfig.insertContacts(1,theme,InputMessage,first_name,last_name,phone_number,email,answer);
        mySQLConfig.closeConnection();
    }

    // CHECK LOGIN

//    @RequestMapping(value = "/api/authenticate/{email}/{password}/", method = RequestMethod.GET)
//    public String getUser(
//            @PathVariable String email, @PathVariable String password)
//    {
//        int userID;
//        String uid = "";
//        MySQLConfig mySQLConfig = new MySQLConfig();
//        mySQLConfig.connect();
//
//        userID = mySQLConfig.getLogin(email,password);
//        mySQLConfig.closeConnection();
//
//        if(userID == -1)
//        {
//            uid = "error";
//        }
//        else
//        {
//            uid = Integer.toString(userID);
//        }
//        return uid;
//    }

//    @RequestMapping(value = "/api/authenticate/{email}/{password}", method = RequestMethod.GET)
//    public int doSmth(@PathVariable String email, @PathVariable String password)
//    {
//        int userID;
//        String uid = "";
//        MySQLConfig mySQLConfig = new MySQLConfig();
//        mySQLConfig.connect();
//
////        email="admin@admin.lt";
////        password="admin";
//
//        userID = mySQLConfig.getLogin(email,password);
//        mySQLConfig.closeConnection();
//
//
//        return userID;
//    }

    // GET HISTORY TABLE FOR SPECIFIC USER
    @RequestMapping(value = "/api/history/getall/{userID}", method = RequestMethod.GET)
    public ArrayList<HistoryRegistrations> getHistoryTable(@PathVariable String userID)
    {
        ArrayList<HistoryRegistrations> historyTable = new ArrayList<HistoryRegistrations>();
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();

        historyTable = mySQLConfig.getHistoryTable(Integer.parseInt(userID));
        mySQLConfig.closeConnection();

        return historyTable;
    }

    // GET SPECIFIC REGISTRATION
    @RequestMapping(value = "/api/history/view/{UserID}/{RegistrationID}", method = RequestMethod.GET)
    public ArrayList<HistoryRegistrations> getHistoryTableElement(@PathVariable String UserID,@PathVariable String RegistrationID)
    {
        ArrayList<HistoryRegistrations> historyTable = new ArrayList<HistoryRegistrations>();
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();

        historyTable = mySQLConfig.getHistoryTableElement(Integer.parseInt(UserID),Integer.parseInt(RegistrationID));
        mySQLConfig.closeConnection();

        return historyTable;
    }

    // DELETE SPECIFIC REGISTRATION
    @RequestMapping(value = "/api/history/delete/{UserID}/{RegistrationID}", method = RequestMethod.PUT)
    public void deleteHistoryTableElement(@PathVariable String UserID,@PathVariable String RegistrationID)
    {
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();

        mySQLConfig.deleteRegistration(Integer.parseInt(UserID),Integer.parseInt(RegistrationID));
        mySQLConfig.closeConnection();
    }

    //LOGIN
    @RequestMapping(value = "/api/authenticate", method = RequestMethod.POST)
    public String authenticate(@RequestBody final User person, HttpServletRequest request) {
        String UserID;
        int temp = -1;

        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();

//        email="admin@admin.lt";
//        password="admin";

        temp = mySQLConfig.getLogin(person.getEmail(),person.getPassword());
        mySQLConfig.closeConnection();
        UserID = Integer.toString(temp);

        return UserID;
    }

}
