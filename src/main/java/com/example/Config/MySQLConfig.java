package com.example.Config;

import java.sql.*;
import java.util.ArrayList;

public class MySQLConfig {
    private String url = "jdbc:mysql://127.11.130.2:3306/";
    private String dbName = "swedbank";
    private String driver = "com.mysql.jdbc.Driver";
    private String userName = "adminMY4mu4d";
    private String password = "rISkSPUHab69";

    private Connection conn;
    private Statement st;

    public boolean connect()
    {
        try {
            Class.forName(driver).newInstance();
            conn = DriverManager.getConnection(url + dbName, userName, password);
            st = conn.createStatement();
            return true;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return false;
    }

    public void closeConnection() {
        try {
            conn.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void insertRegistrations(
            int userID, String name, String surname,
            String tel, String email, String bank,
            Date date, Time time, String subject, String message ) {
        String query = String.format("INSERT INTO REGISTRATIONS (UserID,Name,Surname,PhoneNo,EMail,BankDepartment,RegistrationDate,RegistrationTime,DropDownList,Message)" +
                        "values(\"%d\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\");",
                userID, name, surname, tel, email, bank, date.toString(), time.toString(), subject, message);
        try {
            st.executeUpdate(query);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public void insertContacts(
            int userID, String theme, String InputMessage,
            String first_name, String last_name, String phone_number,
            String email, String answer) {
        String query = String.format("INSERT INTO CONTACTS (UserID,DropDownList,Message,Name,Surname,PhoneNo,EMail,ContactMethod)" +
                        "values(\"%d\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\", \"%s\");",
                userID, theme, InputMessage, first_name, last_name, phone_number, email, answer);
        try {
            st.executeUpdate(query);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public int getLogin(String email, String password)
    {
        int userID = -1;

        try {
            String query = String.format("Select UserID from LOGINS where LOGINS.EMail = \"%s\" AND LOGINS.Password = \"%s\" ;",email,password);
            ResultSet resultSet = st.executeQuery(query);
            while(resultSet.next())
            {
                userID = Integer.parseInt(resultSet.getString("UserID"));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return userID;
    }

    public ArrayList<HistoryRegistrations> getHistoryTable(int userID)
    {
        ArrayList<HistoryRegistrations> historyTable = new ArrayList<HistoryRegistrations>();
        HistoryRegistrations hr;
        String query = String.format("Select * from REGISTRATIONS where REGISTRATIONS.UserID = \"%d\";",userID);
        try {
            ResultSet resultSet = st.executeQuery(query);
            while(resultSet.next())
            {
                String regid = resultSet.getString("RegistrationID");
                String usrid = resultSet.getString("UserID");
                String name = resultSet.getString("Name");
                String surname = resultSet.getString("Surname");
                String phone = resultSet.getString("PhoneNo");
                String email = resultSet.getString("EMail");
                String bank = resultSet.getString("BankDepartment");
                String regdate = resultSet.getString("RegistrationDate");
                String regtime = resultSet.getString("RegistrationTime");
                String dropdown = resultSet.getString("DropDownList");
                String message = resultSet.getString("Message");
                hr = new HistoryRegistrations(regid,usrid,name,surname,phone,email,bank,regdate,regtime,dropdown,message);
                historyTable.add(hr);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return historyTable;
    }

    public ArrayList<HistoryRegistrations> getHistoryTableElement(int userID, int registrationID)
    {
        ArrayList<HistoryRegistrations> historyTable = new ArrayList<HistoryRegistrations>();
        HistoryRegistrations hr;
        String query = String.format("Select * from REGISTRATIONS where REGISTRATIONS.UserID = \"%d\" AND REGISTRATIONS.RegistrationID = \"%d\";",userID,registrationID);
        try {
            ResultSet resultSet = st.executeQuery(query);
            while(resultSet.next())
            {
                String regid = resultSet.getString("RegistrationID");
                String usrid = resultSet.getString("UserID");
                String name = resultSet.getString("Name");
                String surname = resultSet.getString("Surname");
                String phone = resultSet.getString("PhoneNo");
                String email = resultSet.getString("EMail");
                String bank = resultSet.getString("BankDepartment");
                String regdate = resultSet.getString("RegistrationDate");
                String regtime = resultSet.getString("RegistrationTime");
                String dropdown = resultSet.getString("DropDownList");
                String message = resultSet.getString("Message");
                hr = new HistoryRegistrations(regid,usrid,name,surname,phone,email,bank,regdate,regtime,dropdown,message);
                historyTable.add(hr);
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return historyTable;
    }

    public void deleteRegistration(int userID, int registrationID)
    {
        String query = String.format("Delete from REGISTRATIONS where REGISTRATIONS.UserID = \"%d\" AND REGISTRATIONS.RegistrationID = \"%d\";",userID,registrationID);
        try {
            st.executeUpdate(query);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

}