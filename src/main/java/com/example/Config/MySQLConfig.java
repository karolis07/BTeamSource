package com.example.Config;


import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

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

    public ArrayList<String> selectTest(String query) {
        ArrayList<String> result = new ArrayList<String>();
        String line = "";

        if (query.equals(""))
            query = "SELECT * FROM Test";

        try {
            ResultSet res = st.executeQuery(query);
            while (res.next()) {
                int id = res.getInt("ID");
                String name = res.getString("name");
                String surname = res.getString("surname");
                line = String.valueOf(id) + ";" + name + ";" + surname;
                result.add(line);
            }
        } catch (Exception e) {
            System.out.printf(e.getMessage());
        }

        return result;
    }

    public void insertTest(int id, String name, String surname) {
        String query = String.format("insert into Test(id, name, surname)" +
                        "values("+id+","+name.toString()+","+surname.toString()+");");
        try {
            int value = st.executeUpdate(query);
            if (value == 1)
                System.out.println("Successfully inserted value");
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
            int value = st.executeUpdate(query);
            if (value == 1)
                System.out.println("Successfully inserted value");
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
            int value = st.executeUpdate(query);
            if (value == 1)
                System.out.println("Successfully inserted value");
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    public int getLogin(String email, String password)
    {
        int userID = -1;
        String query = String.format("Select * from LOGINS where LOGINS.EMail = \"%s\" AND LOGINS.Password = \"%s\";",email,password);
        try {
            ResultSet resultSet = st.executeQuery(query);
            while(resultSet.next())
            {
                userID = resultSet.getInt("UserID");
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        return userID;
    }

    public Map<String,ArrayList<String>> getHistoryTable(int userID)
    {
        Map<String,ArrayList<String>> historyTable = new HashMap<String, ArrayList<String>>();
        ArrayList<String> historyDate = new ArrayList<String>();
        ArrayList<String> historyTime = new ArrayList<String>();
        ArrayList<String> historyBank = new ArrayList<String>();
        ArrayList<String> historyTheme = new ArrayList<String>();
        String query = String.format("Select * from REGISTRATIONS where REGISTRATIONS.UserID = \"%d\";",userID);
        try {
            ResultSet resultSet = st.executeQuery(query);
            while(resultSet.next())
            {
                historyDate.add(resultSet.getString("RegistrationDate"));
                historyTime.add(resultSet.getString("RegistrationTime"));
                historyBank.add(resultSet.getString("BankDepartment"));
                historyTheme.add(resultSet.getString("DropDownList"));
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        historyTable.put("Date",historyDate);
        historyTable.put("Time",historyTime);
        historyTable.put("Bank",historyBank);
        historyTable.put("Theme",historyTheme);

        return historyTable;
    }


}


