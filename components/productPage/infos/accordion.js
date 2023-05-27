import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import styles from "./styles.module.scss";

export default function ProductAccordions({ details }) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={styles.infos_accordion}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
        className={styles.accordion}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
          className={styles.accordion_summery}>
          Specification
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <p>{details[0]}</p>
          </div>
        </AccordionDetails>
        <AccordionDetails>
          {details.slice(1, details.length).map((info, i) => (
            <div key={i} className={styles.infos_accordion_grid}>
              <span>{info.name}</span>
              <span>{info.value}</span>
            </div>
          ))}
        </AccordionDetails>
      </Accordion>
      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        className={styles.accordion}>
        <AccordionSummary
          className={styles.accordion_summary}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header">
          Size & Fit
        </AccordionSummary>
        <AccordionDetails>
          <div className={styles.infos_accordion_grid}></div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
