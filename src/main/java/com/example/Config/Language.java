package com.example.Config;

import java.util.*;

public class Language {
   //private List<String> fieldsNames = new ArrayList<String>();
    public Map<String,String> fieldsNames = new HashMap<String, String>();

    public Map<String,String> getLT()
    {
        fieldsNames = new HashMap<String, String>();

        // LOGIN
        fieldsNames.put("titleOne","IT Akademijos Bankas");
        fieldsNames.put("titleTwo","Fianansų konsultacijos");

        fieldsNames.put("loginTitle","PRISIJUNKITE");
        fieldsNames.put("loginEmail","El. paštas");
        fieldsNames.put("loginPassword","Slaptažodis");
        fieldsNames.put("loginButtonLogin","Prisijungti");
        fieldsNames.put("loginButtonRegister","Prisiregistruoti");
        fieldsNames.put("loginCookie","Likti prisijungus");

        fieldsNames.put("loginError","Nėra tokio vartotojo registruoto el. pašto");
        fieldsNames.put("loginError2","Neteisingas slaptažodis");

        //  HOME

        fieldsNames.put("homeTitle", "SUSISIEKITE SU MUMIS");
        fieldsNames.put("homeButtonWrite", "Parašykite");
        fieldsNames.put("homeButtonRegister", "Registruokitės");
        fieldsNames.put("homeButtonHistory", "Mano registracijos");
        fieldsNames.put("homeFooterText","Jei klausimas susijęs su Jūsų finansine informacija „IT Akademijos Bankas, paskambinus telefonais 1234 ir 4321 informaciją suteiksime nustatę Jūsų kaip banko kliento tapatybę. ");

        //  CONTACT

        fieldsNames.put("contactTitle","Parašykite mums");
        fieldsNames.put("contactMessage","Žinutės tekstas");
        fieldsNames.put("contactAnswer","Kaip pageidaujate gauti atsakymą");
        fieldsNames.put("contactAnswerList1","Telefonu");
        fieldsNames.put("contactAnswerList2","El. paštu");
        fieldsNames.put("contactAnswerList3","El. paštu ir telefonu");
        fieldsNames.put("contactFooterText","Į pateiktus klausimus atsakome darbo dienomis 8–20 val., šeštadieniais 9–16 valandomis. Jeigu Jums reikalinga skubi " +
                "informacija, laukiame jūsų skambučių tel. 1884 (privatiems klientams) bei 1633 (verslo klientams). Iš užsienio skambinkite tel. +370 5 268 4444 " +
                "(privatiems klientams) bei +370 5 268 4422 (verslo klientams).”");

        fieldsNames.put("contactError","Užpildykite privalomus laukus");

        // CONTACT CONFIRMATION

        fieldsNames.put("contactConfirmText","Sveiki,\n" +
                "dėkojame, kad kreipiatės į „IT Akademijos Bankas“.\n" +
                "Į pateiktus klausimus atsakome darbo dienomis 8–20 val., šeštadieniais 9–16 valandomis. Jeigu Jums reikalinga skubi informacija, " +
                "laukiame Jūsų skambučių telefonu 1884 arba tel. +370 5 268 4444, jei skambinate iš užsienio. Linkime geros dienos!\n");

        //  REGISTRATION

        fieldsNames.put("registrationTitle","Registruokitės konsultacijai internetu");
        fieldsNames.put("registrationBankDepartment","Banko skyrius");
        fieldsNames.put("registrationBankDepartmentList1","Antakalnio g. 45");
        fieldsNames.put("registrationBankDepartmentList2","Ateities g. 91 (PC Mandarinas)");
        fieldsNames.put("registrationBankDepartmentList3","Gedimino pr. 56");
        fieldsNames.put("registrationBankDepartmentList4","Konstitucijos pr. 20A, dirba Būsto Centras");
        fieldsNames.put("registrationBankDepartmentList5","Ozo g. 25 (PPC „Akropolis“)");
        fieldsNames.put("registrationDate","Data");
        fieldsNames.put("registrationTime","Konsultacijos laikas");
        fieldsNames.put("registrationMessage","Pastabos, komentarai");

        //  REGISTRATION CONFIRMATION

        fieldsNames.put("registrationConfirmationTitle","Registracijos patvirtinimas");
        fieldsNames.put("registrationFooterText", "Ačiū, kad domitės banko paslaugomis.\n" +
                "Jeigu Jums reikalinga skubi informacija, laukiame Jūsų skambučių telefonu 1884, darbo dienomis 8-20 val., šeštadieniais 9-16 val.\n");

        // REGISTRATION AND CONTACT

        fieldsNames.put("name","Vardas");
        fieldsNames.put("surname","Pavardė");
        fieldsNames.put("phone","Telefonas");
        fieldsNames.put("email","El. paštas");
        fieldsNames.put("select", "Pasirinkite");

        fieldsNames.put("theme","Tema");
        fieldsNames.put("themeList1","Taupymas ir investavimas;");
        fieldsNames.put("themeList2","Pensijos ir kaupimas;");
        fieldsNames.put("themeList3","Gyvybės draudimas;");
        fieldsNames.put("themeList4","Ne gyvybės draudimas;");
        fieldsNames.put("themeList5","Paskolos, lizingas;");
        fieldsNames.put("themeList6","Kasdienių finansų valdymas.");

        // HISTORY

        fieldsNames.put("historyTitle","Registracijos internetu");
        fieldsNames.put("historyButtonLook","Peržiūrėti");
        fieldsNames.put("historyButtonDelete","Atsisakyti");

        // MISC
        fieldsNames.put("buttonSend","Siųsti");
        fieldsNames.put("buttonBack","< Atgal");

        return fieldsNames;
    }

    public Map<String,String> getEN()
    {
        fieldsNames = new HashMap<String, String>();

        // LOGIN
        fieldsNames.put("titleOne","IT Academy Bank");
        fieldsNames.put("titleTwo","Financial consults");
        fieldsNames.put("select", "Select");

        fieldsNames.put("loginTitle","LOG IN");
        fieldsNames.put("loginEmail","E. Mail");
        fieldsNames.put("loginPassword","Password");
        fieldsNames.put("loginButtonLogin","Submit");
        fieldsNames.put("loginButtonRegister","Register");
        fieldsNames.put("loginCookie","Keep me loged in");

        fieldsNames.put("loginError","There is no such a e. mail");
        fieldsNames.put("loginError2","Wrong password");

        //  HOME

        fieldsNames.put("homeTitle", "CONTACT US");
        fieldsNames.put("homeButtonWrite", "Write to us");
        fieldsNames.put("homeButtonRegister", "Register");
        fieldsNames.put("homeButtonHistory", "My Registrations");
        fieldsNames.put("homeFooterText","If your question relates to the financial information of the IT Academy Bank by phoning 1234 4321 information is available from your set as a bank client's identity.");

        //  CONTACT

        fieldsNames.put("contactTitle","Write to us");
        fieldsNames.put("contactMessage","Message text");
        fieldsNames.put("contactAnswer","How would you like to get feedback");
        fieldsNames.put("contactAnswerList1","Phone");
        fieldsNames.put("contactAnswerList2","E. mail");
        fieldsNames.put("contactAnswerList3","E. mail and Phone");
        fieldsNames.put("contactFooterText","Answers to questions raised on weekdays 8-20 pm., Saturdays 9-16 hours. If you need immediate" +
                "Information , waiting for your call tel . 1884 ( for residential customers ) and 1633 ( for business customers ) . From abroad call tel . " +
                "+370 5 268 4444 ( For residential customers ) and +370 5 268 4422 (business customers). ");

        fieldsNames.put("contactError","Fill in the required fields");

        // CONTACT CONFIRMATION

        fieldsNames.put("contactConfirmText","Welcome,\n" +
                "Thank you for contacting the IT Academy Bank . \n" +
                "Answers to questions raised on weekdays 8-20 pm . , Saturdays 9-16 hours. If you need immediate information \n" +
                "We are waiting for your phone call 1884 or tel . +370 5 268 4444 if you are calling from abroad. We wish a good day !");

        //  REGISTRATION

        fieldsNames.put("registrationTitle","Register for consult on the internet");
        fieldsNames.put("registrationBankDepartment","Bank Department");
        fieldsNames.put("registrationBankDepartmentList1","Antakalnio g. 45");
        fieldsNames.put("registrationBankDepartmentList2","Ateities g. 91 (PC Mandarinas)");
        fieldsNames.put("registrationBankDepartmentList3","Gedimino pr. 56");
        fieldsNames.put("registrationBankDepartmentList4","Konstitucijos pr. 20A, works Būsto Centras");
        fieldsNames.put("registrationBankDepartmentList5","Ozo g. 25 (PPC „Akropolis“)");
        fieldsNames.put("registrationDate","Date");
        fieldsNames.put("registrationTime","Consult time");
        fieldsNames.put("registrationMessage","Note, comments");

        //  REGISTRATION CONFIRMATION

        fieldsNames.put("registrationConfirmationTitle","Registration confirmation");
        fieldsNames.put("registrationFooterText", "Thank you for your interest in the bank.\n" +
                "If you are in need of urgent information , waiting for your call by phone 1884 , weekdays 8-20 pm . , Saturdays 9-16 hours .\n");

        // REGISTRATION AND CONTACT

        fieldsNames.put("name","Name");
        fieldsNames.put("surname","Surname");
        fieldsNames.put("phone","Phone");
        fieldsNames.put("email","E. mail");

        fieldsNames.put("theme","Theme");
        fieldsNames.put("themeList1","Savings and investments;");
        fieldsNames.put("themeList2","Pensions and accumulation;");
        fieldsNames.put("themeList3","Life insurance;");
        fieldsNames.put("themeList4","Non-life insurance;");
        fieldsNames.put("themeList5","loans and leasing;");
        fieldsNames.put("themeList6","The daily financial management.");

        // HISTORY

        fieldsNames.put("historyTitle","Registration through internet");
        fieldsNames.put("historyButtonLook","Review");
        fieldsNames.put("historyButtonDelete","Cancel");

        // MISC
        fieldsNames.put("buttonSend","Send");
        fieldsNames.put("buttonBack","< Back");

        return fieldsNames;
    }
}
