package com.example.Config;

/**
 * Created by Karolis on 2016.02.22.
 */
public class HistoryRegistrations {
    private String RegistrationID;
    String Name;
    String Surname;
    String PhoneNo;
    String Email;
    String BankDepartment;
    String RegistrationDate;
    String RegistrationTime;
    String DropDownList;
    String Message;

    public HistoryRegistrations(String registrationID, String name, String surname, String phoneNo, String email, String bankDepartment, String registrationDate, String registrationTime, String dropDownList, String message) {
        this.RegistrationID = registrationID;
        this.Name = name;
        this.Surname = surname;
        this.PhoneNo = phoneNo;
        this.Email = email;
        this.BankDepartment = bankDepartment;
        this.RegistrationDate = registrationDate;
        this.RegistrationTime = registrationTime;
        this.DropDownList = dropDownList;
        this.Message = message;
    }

    public String getRegistrationID() {
        return RegistrationID;
    }
}
