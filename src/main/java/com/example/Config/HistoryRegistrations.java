package com.example.Config;

/**
 * Created by Karolis on 2016.02.22.
 */
public class HistoryRegistrations {
    String RegistrationID;
    String UserID;
    String Name;
    String Surname;
    String PhoneNo;
    String Email;
    String BankDepartment;
    String RegistrationDate;
    String RegistrationTime;
    String DropDownList;
    String Message;

    public HistoryRegistrations(String registrationID, String UserID, String name, String surname, String phoneNo, String email, String bankDepartment, String registrationDate, String registrationTime, String dropDownList, String message) {
        this.RegistrationID = registrationID;
        this.UserID = UserID;
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

    public String getName() {
        return Name;
    }

    public String getUserID() {
        return UserID;
    }

    public String getSurname() {
        return Surname;
    }

    public String getPhoneNo() {
        return PhoneNo;
    }

    public String getEmail() {
        return Email;
    }

    public String getBankDepartment() {
        return BankDepartment;
    }

    public String getRegistrationDate() {
        return RegistrationDate;
    }

    public String getRegistrationTime() {
        return RegistrationTime;
    }

    public String getDropDownList() {
        return DropDownList;
    }

    public String getMessage() {
        return Message;
    }
}
