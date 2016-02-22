package com.example.Services;

import com.example.Config.Language;
import com.example.Config.MySQLConfig;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@RestController
public class NewService {
    Language language = new Language();

    @RequestMapping("/lt")
    public Map<String,String> getLanguageLT() {

        language.getLT();
        //language.fieldsNames.get("name");

        return language.fieldsNames;
    }

    @RequestMapping("/en")
    public Map<String,String> getLanguageEN() {

        language.getEN();
        //language.fieldsNames.get("name");

        return language.fieldsNames;
    }

    @RequestMapping("/sql")
    public Map<String, ArrayList<String>> getAllRegistrations() {
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();

        ArrayList<String> result; // = new ArrayList<String>();
        result = mySQLConfig.selectTest("");

        ArrayList<String> databaseValues;
        Map<String, ArrayList<String>> dataFromDatabase = new HashMap<String, ArrayList<String>>();
        for (String s : result) {
            String[] split = s.split(";");
            databaseValues = new ArrayList<String>();
            databaseValues.add(split[1]);
            databaseValues.add(split[2]);

            dataFromDatabase.put(split[0], databaseValues);
        }

        mySQLConfig.closeConnection();
        return dataFromDatabase;
    }

    @RequestMapping(value = "/insert", method = RequestMethod.GET)
    public void doSmth(String id, String name, String surname) {
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();
        mySQLConfig.insertTest(Integer.parseInt(id),name,surname);
        mySQLConfig.closeConnection();
    }
    @RequestMapping(value = "/US1/{id}/{name}/{surname}", method = RequestMethod.PUT)
    public void putInTest(@PathVariable String id, @PathVariable String name, @PathVariable String surname) {
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();
        mySQLConfig.insertTest(Integer.parseInt(id),name,surname);
        mySQLConfig.closeConnection();
    }



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

    @RequestMapping(value = "/api/authenticate", method = RequestMethod.POST)
    public String doSmth(String email, String password)
    {
        int userID;
        String uid = "";
        MySQLConfig mySQLConfig = new MySQLConfig();
        mySQLConfig.connect();

        userID = mySQLConfig.getLogin(email,password);
        mySQLConfig.closeConnection();

        if(userID == -1)
        {
            uid = "error";
        }
        else
        {
            uid = Integer.toString(userID);
        }
        return uid;
    }

}
