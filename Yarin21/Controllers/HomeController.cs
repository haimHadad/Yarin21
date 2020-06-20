using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Yarin21.Models;

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

            return true;
        }
    }
}