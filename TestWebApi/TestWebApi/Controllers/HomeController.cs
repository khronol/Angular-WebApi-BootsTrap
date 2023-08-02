using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Data;
using System.Data.SqlClient;

namespace TestWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;
        public HomeController(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        [HttpGet]
        public JsonResult Get()
        {
            string query = @"SELECT EmployeeID,EmployeeName,EmployeeDateOfBirth,EmployeeFirstWorkDay,EmployeeSalary FROM dbo.Employee";
            DataTable table = new DataTable();
            SqlDataReader reader;
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query,con))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }
                
            }

            return new JsonResult(table);
        }
        [HttpPost]
        public JsonResult Post(Employee emp)
        {
            string query = @$"INSERT INTO dbo.Employee (EmployeeName,EmployeeDateOfBirth,EmployeeFirstWorkDay,EmployeeSalary)
                            VALUES
                            ('{emp.EmployeeName}','{emp.EmployeeDateOfBirth}','{emp.EmployeeFirstWorkDay}','{emp.EmployeeSalary}')";

            DataTable table = new DataTable();
            SqlDataReader reader;
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }

            }
            return new JsonResult("Added succesfully");
        }

        [HttpPut]
        public JsonResult Put(Employee emp)
        {
            string query = @$"UPDATE dbo.Employee set
                            EmployeeName = '{emp.EmployeeName}',
                            EmployeeDateOfBirth = '{emp.EmployeeDateOfBirth}',
                            EmployeeFirstWorkDay = '{emp.EmployeeFirstWorkDay}',
                            EmployeeSalary = '{emp.EmployeeSalary}'
                            WHERE EmployeeID = {emp.EmployeeId}";

            DataTable table = new DataTable();
            SqlDataReader reader;
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }

            }
            return new JsonResult("Update succesfully");
        }
        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            string query = @$"DELETE FROM dbo.Employee WHERE EmployeeID = {id}";

            DataTable table = new DataTable();
            SqlDataReader reader;
            string sqlDataSource = _configuration.GetConnectionString("DefaultConnection");
            using (SqlConnection con = new SqlConnection(sqlDataSource))
            {
                con.Open();
                using (SqlCommand cmd = new SqlCommand(query, con))
                {
                    reader = cmd.ExecuteReader();
                    table.Load(reader);
                    reader.Close();
                    con.Close();
                }

            }
            return new JsonResult("Deleted succesfully");
        }
    }
}
