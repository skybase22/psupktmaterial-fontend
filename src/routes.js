
import Index from "views/Index.js";
import Edit from "views/pages/Edit.js";
import Add from "views/pages/Add.js";
import Login from "views/pages/Login.js";
import History from "views/pages/History.js";
import Print from "views/pages/Prints.js";
import Detail from "views/pages/Detail.js";

var routes = [
  {
    path: "/index",
    name: "Material",
    icon: "fas fa-tools text-primary",
    component: Index,
    layout: "/material"
  },
  {
    path: "/print",
    name: "Print",
    icon: "fa fa-print text-success",
    component: Print,
    layout: "/material"
  },
  {
    path: "/detail",
    name: "Detail",
    icon: "fa fa-list-ul text-purple",
    component: Detail,
    layout: "/material"
  },
  {
    path: "/add",
    name: "Add",
    icon: "fa fa-file text-orange",
    component: Add,
    layout: "/material"
  },
  {
    path: "/edit",
    name: "Edit",
    icon: "fa fa-edit text-yellow",
    component: Edit,
    layout: "/material"
  },
  {
    path: "/history",
    name: "History",
    icon: "fa fa-history text-red",
    component: History,
    layout: "/material"
  },
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth"
  },
];
export default routes;
