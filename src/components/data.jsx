import { RiApps2Fill, RiDashboardFill } from 'react-icons/ri'
import { ImUserPlus } from 'react-icons/im'
import { RiScissors2Fill } from 'react-icons/ri'
import { GiPieChart } from 'react-icons/gi'
import { FaCalendarAlt } from 'react-icons/fa'
import { BsCheckCircle } from 'react-icons/bs'
import { TbApiApp, TbMessageCircle } from 'react-icons/tb'
import { VscRepoForked } from 'react-icons/vsc'
import { SiAppveyor, SiNetapp, SiTurborepo } from 'react-icons/si'
import { TbReportSearch } from 'react-icons/tb'
import { MdQueue } from 'react-icons/md'
import { AiOutlineDeploymentUnit } from 'react-icons/ai'

export const menudata = [
  {
    id: 1,
    menu_logo: <RiDashboardFill />,
    menu_title: "Dashboard",
    menu_link: "/barber-dashboard",
    category: [
      {
        id: 1,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },
  // {
  //   id: 2,
  //   menu_logo: <FaCalendarAlt />,
  //   menu_title: "Calender",
  //   menu_link: "",
  //   category: [
  //     {
  //       id: 2,
  //       list_logo: <BsCheckCircle />,
  //       list: "List",
  //       message_logo: <TbMessageCircle />,
  //       message_title: "Send mail / Notification"
  //     }
  //   ]
  // },
  {
    id: 3,
    menu_logo: <GiPieChart />,
    menu_title: "Reports",
    menu_link: "",
    category: [
      {
        id: 3,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },
  {
    id: 4,
    menu_logo: <RiDashboardFill />,
    menu_title: "Custom",
    menu_link: "",
    category: [
      {
        id: 4,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },
  {
    id: 5,
    menu_logo: <SiNetapp />,
    menu_title: "Queue",
    menu_link: "/barber/queuelist",
    category: [
      {
        id: 5,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },

  {
    id: 6,
    menu_logo: <SiAppveyor />,
    menu_title: "Appoinment",
    menu_link: "/barber/appoinment",
    category: [
      {
        id: 8,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  }
]


export const adminmenudata = [
  {
    id: 1,
    menu_logo: <RiDashboardFill />,
    menu_title: "Dashboard",
    menu_link: "/admin-dashboard",
    category: [
      {
        id: 1,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },
  // {
  //   id: 2,
  //   menu_logo: <FaCalendarAlt />,
  //   menu_title: "Calender",
  //   menu_link: "",
  //   category: [
  //     {
  //       id: 2,
  //       list_logo: <BsCheckCircle />,
  //       list: "List",
  //       message_logo: <TbMessageCircle />,
  //       message_title: "Send mail / Notification"
  //     }
  //   ]
  // },
  {
    id: 3,
    menu_logo: <RiScissors2Fill />,
    menu_title: "Salons",
    menu_link: "/salon/salonlist",
    category: [
      {
        id: 3,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },
  {
    id: 4,
    menu_logo: <ImUserPlus />,
    menu_title: "Barbers",
    menu_link: "/barber/dashboard2",
    category: [
      {
        id: 4,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },

  {
    id: 5,
    menu_logo: <RiDashboardFill />,
    menu_title: "Customers",
    menu_link: "/customer/dashboard3",
    category: [
      {
        id: 5,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },
  {
    id: 6,
    menu_logo: <GiPieChart />,
    menu_title: "Reports",
    menu_link: "",
    category: [
      {
        id: 6,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },
  {
    id: 7,
    menu_logo: <TbApiApp />,
    menu_title: "Advertisments",
    menu_link: "/advertisement",
    category: [
      {
        id: 7,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },
  {
    id: 8,
    menu_logo: <SiNetapp />,
    menu_title: "Queue",
    menu_link: "/queue",
    category: [
      {
        id: 8,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },

  {
    id: 8,
    menu_logo: <AiOutlineDeploymentUnit />,
    menu_title: "Appoinment",
    menu_link: "/appoinment",
    category: [
      {
        id: 8,
        list_logo: <BsCheckCircle />,
        list: "List",
        message_logo: <TbMessageCircle />,
        message_title: "Send mail / Notification"
      }
    ]
  },

]

export const reports = [
  {
    id: 1,
    backgroundColor: "blue",
    icon: <VscRepoForked />,
    para: "Weekly Reports"
  },
  {
    id: 2,
    backgroundColor: "#2196F3",
    icon: <SiTurborepo />,
    para: "Monthly Reports"
  },
  {
    id: 3,
    backgroundColor: "skyblue",
    icon: <TbReportSearch />,
    para: "Hourly Reports"
  }
]


export const customerDetail = [
  {
    id: 1,
    customerID: "BH1367896543",
    firstName: "Kunal",
    LastName: "Jasuja"
  },
  {
    id: 2,
    customerID: "BH1367896765",
    firstName: "Kunal",
    LastName: "Jasuja"
  },
  {
    id: 3,
    customerID: "BH1367896542",
    firstName: "Kunal",
    LastName: "Jasuja"
  },
  {
    id: 4,
    customerID: "BH1367896098",
    firstName: "Kunal",
    LastName: "Jasuja"
  },
  {
    id: 5,
    customerID: "BH13678965765",
    firstName: "Kunal",
    LastName: "Jasuja"
  }
]

export const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];