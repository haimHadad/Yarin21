using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yarin21.Models;
using System;
using System.Net;
using System.Net.Mail;

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
            var mailTo = o.email;
            var txtPassword = "qwer1234@";
            var fromAddress = new MailAddress(mailFrom, senderName);
            var toAddrress = new MailAddress(mailTo, senderName);
            var messageContent = "הזמנה חדשה עבור " + o.fname;
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
            return true;
        }
    }
}