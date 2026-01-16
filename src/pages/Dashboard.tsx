import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
// import ListAltOutlinedIcon from "@mui/icons-material/ListAltOutlined";
// import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
// import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
// import IconBadge from "../components/IconBadge";
import DashboardCard from "../components/DashboardCard";
import MainLayout from "../layouts/MainLayout";
import orderNowIcon from "../assets/dashboard-order-now.svg";
import ordersIcon from "../assets/dashboard-orders.svg";
import resumeDraftIcon from "../assets/dashboard-resume-draft.svg";
import templatesIcon from "../assets/dashboard-templates.svg";
import "../components/styles/dashboard.css";

const CircularIconFlexBox = ({ children }: { children: React.ReactNode }) => (
  <Box
    sx={{
      width: 60,
      height: 60,
      borderRadius: 100,
      backgroundColor: "#F7FAFF",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    {children}
  </Box>
);

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [highlightedCard, setHighlightedCard] = useState<string | null>(null);

  const cards = [
    {
      key: "order-now",
      highlighted: highlightedCard === "order-now",
      title: "Order Now",
      description: "Create a new DAFO order",
      icon: (
        // <IconBadge
        //   sx={{
        //     backgroundColor: "#E4E6EF",
        //     color: "#2D5499",
        //   }}
        // >
        //   <ShoppingBagOutlinedIcon />
        // </IconBadge>
        <CircularIconFlexBox>
          <img src={orderNowIcon} alt="Order Now" width={28} height={36} />
        </CircularIconFlexBox>
      ),
      footerIcon: <></>,
      // would require blue bg version vector image
      //   highlightedCard === "order-now" ? (
      //     <img src={orderNowIcon} alt="Order Now" width={78} height={98} />
      //   ) : (
      //     <></>
      //   ),
      onClick: () => navigate("/new-order"),
    },
    {
      key: "orders",
      title: "Orders",
      highlighted: highlightedCard === "orders",
      description: "See status of your orders",
      icon: (
        // <IconBadge
        //   sx={{
        //     backgroundColor: "#E4E6EF",
        //     color: "#2D5499",
        //   }}
        // >
        //   <ListAltOutlinedIcon />
        // </IconBadge>
        <CircularIconFlexBox>
          <img src={ordersIcon} alt="Orders" width={28} height={28} />
        </CircularIconFlexBox>
      ),
      footerIcon: <></>,
      // would require blue bg version vector image
      // footerIcon:
      //   highlightedCard === "orders" ? (
      //     <img src={ordersIcon} alt="Orders" width={78} height={98} />
      //   ) : (
      //     <></>
      //   ),
      onClick: () => navigate("/orders"),
    },
    {
      key: "resume-draft",
      title: "Resume Draft",
      highlighted: highlightedCard === "resume-draft",
      description: "Continue an order",
      icon: (
        // <IconBadge
        //   sx={{
        //     backgroundColor: "#E4E6EF",
        //     color: "#2D5499",
        //   }}
        // >
        //   <DescriptionOutlinedIcon />
        // </IconBadge>
        <CircularIconFlexBox>
          <img
            src={resumeDraftIcon}
            alt="Resume Draft"
            width={26}
            height={26}
          />
        </CircularIconFlexBox>
      ),
      footerIcon: <></>,
      // footerIcon:
      //   highlightedCard === "resume-draft" ? (
      //     <img src={resumeDraftIcon} alt="Orders" width={78} height={98} />
      //   ) : (
      //     <></>
      //   ),
      onClick: () => navigate("/orders", { state: { filter: "Draft" } }),
    },
    {
      key: "manage-templates",
      title: "Manage Templates",
      highlighted: highlightedCard === "manage-templates",
      description: "Create your customizations",
      icon: (
        // <IconBadge
        //   sx={{
        //     backgroundColor: "#E4E6EF",
        //     color: "#2D5499",
        //   }}
        // >
        //   <ViewQuiltOutlinedIcon />
        // </IconBadge>
        <CircularIconFlexBox>
          <img src={templatesIcon} alt="Templates" width={28} height={28} />
        </CircularIconFlexBox>
      ),
      // footerIcon:
      //   highlightedCard === "manage-templates" ? (
      //     <img
      //       src={templatesIcon}
      //       alt="Templates"
      //       width={78}
      //       height={98}
      //       className="dashBoardFooterIcons"
      //     />
      //   ) : (
      //     <></>
      //   ),
      footerIcon: <></>,
      onClick: () => navigate("/templates"),
    },
  ];

  return (
    <MainLayout>
      <Box
        sx={{
          paddingTop: 4,
          paddingBottom: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "calc(100vh - 200px)",
          width: "100%",
        }}
      >
        <Grid
          container
          spacing={3}
          alignItems="stretch"
          sx={{
            width: {
              xs: "100%",
              sm: 480,
              md: 560,
              lg: 740,
            },
          }}
        >
          {cards.map((card) => (
            <Grid
              key={card.key}
              item
              xs={12}
              md={6}
              // className="w-full"
              sx={{ display: "flex" }}
            >
              <DashboardCard
                highlighted={card.highlighted}
                title={card.title}
                description={card.description}
                footerIcon={"footerIcon" in card ? card.footerIcon : undefined}
                sx={{
                  color: "#000",
                  "&:hover": {
                    backgroundColor: card.highlighted
                      ? "#2d5499 !important"
                      : "#ffffff !important",
                  },
                  mr: {
                    lg: 1,
                  },
                }}
                icon={card.icon}
                onClick={card.onClick}
                onHover={() => setHighlightedCard(card?.key)}
                onLeave={() => setHighlightedCard(null)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </MainLayout>
  );
};

export default Dashboard;
