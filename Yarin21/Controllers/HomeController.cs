﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yarin21.Models;
using System.Net;
using System.Net.Mail;
using Nexmo.Api;

namespace Yarin21.Controllers
{
    public class HomeController : Controller
    {
        // GET: Home
        public ActionResult Home()
        {
            return View();
        }

        [HttpPost]
        public bool SendEmail(Order o)
        {     
            var mailFrom = "96yarin.t@gmail.com";
            var senderName = "ירין טל";
            string mailTo = o.email;
            string phoneNum = "0" + o.phone;
            if (!mailTo.Contains("."))
            {
                throw new Exception("כתובת דוא''ל אינה תקינה");
            }

            try
            {
                MailAddress m = new MailAddress(o.email);

            }
            catch (FormatException)
            {
                throw new Exception("כתובת דוא''ל אינה תקינה");
            }

            if (phoneNum.Length != 10)
            {
                throw new Exception("מס' פלאפון אינו תקין");
            }
            var txtPassword = "qwer1234@";
            var fromAddress = new MailAddress(mailFrom, senderName);
            var toAddrress = new MailAddress(mailTo, senderName);
            var messageContent = "הזמנה חדשה עבור " + o.fname +" מספר הטלפון הוא: 0"+o.phone;
            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                Credentials = new NetworkCredential(fromAddress.Address, txtPassword),
                Timeout = 20000
            };

            using (var message = new MailMessage(fromAddress, toAddrress)
            {
                Subject = messageContent,
                Body = o.description
            })
            {
                smtp.Send(message);
            }

            var client = new Client(creds: new Nexmo.Api.Request.Credentials
            {
                ApiKey = "c53cc48e",
                ApiSecret = "PkDPfik6CSWFUUeK"
            });
            var results = client.SMS.Send(request: new SMS.SMSRequest
            {
                from = "Yarin Tal",
                to = "972"+o.phone,
                text = "הזמנה מירין טל נשלחה לאימייל",
                type = "unicode"
            });

            return true;
        }
    }
}