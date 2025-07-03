import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
} from "@react-pdf/renderer";
import { ItineraryData } from "@/app/lib/model";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    fontSize: 12,
    fontFamily: "Helvetica",
    color: "#000",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    textDecoration: "underline",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  itineraryItem: {
    marginBottom: 16,
  },
  itineraryDateTitle: {
    fontWeight: "bold",
    fontStyle: "italic",
  },
  paragraph: {
    marginBottom: 8,
  },
  budgetTable: {
    marginTop: 8,
    marginBottom: 16,
    width: "400px",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid",
  },
  budgetRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: "#000",
    borderBottomStyle: "solid",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  budgetCellKey: {
    flex: 1,
    textTransform: "capitalize",
  },
  budgetCellValue: {
    flex: 1,
    textAlign: "right",
  },
  italicSmall: {
    fontStyle: "italic",
    fontSize: 10,
    fontWeight: "bold",
    marginBottom: 16,
  },
  basicInfoItem: {
    marginBottom: 8,
  },
  basicInfoLabel: {
    fontStyle: "italic",
    fontWeight: "bold",
  },
  basicInfoValue: {
    marginLeft: 16,
  },
});

interface ItineraryPDFProps {
  tripName: string;
  itineraries: ItineraryData;
}

const ItineraryPDF: React.FC<ItineraryPDFProps> = ({
  itineraries,
  tripName,
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{tripName}</Text>

        <View>
          <Text style={styles.sectionTitle}>Itinerary</Text>
          {Object.entries(itineraries.itineraries).map(
            ([
              date,
              { title, accomodations, attractions, summary, transportation },
            ]) => (
              <View key={date} style={styles.itineraryItem}>
                <Text style={styles.itineraryDateTitle}>
                  {date} - {title}
                </Text>
                {summary && <Text style={styles.paragraph}>{summary}</Text>}

                {(accomodations || transportation || attractions) && (
                  <View>
                    {accomodations && (
                      <Text style={styles.paragraph}>
                        Accommodations: {accomodations}
                      </Text>
                    )}
                    {transportation && (
                      <Text style={styles.paragraph}>
                        Transportation: {transportation}
                      </Text>
                    )}
                    {attractions && (
                      <Text style={styles.paragraph}>
                        Attractions: {attractions}
                      </Text>
                    )}
                  </View>
                )}
              </View>
            )
          )}
        </View>

        <View>
          <Text style={styles.sectionTitle}>Budget Breakdown</Text>
          <View style={styles.budgetTable}>
            {Object.entries(itineraries.budget_breakdown).map(
              ([key, value]) => (
                <View key={key} style={styles.budgetRow}>
                  <Text style={styles.budgetCellKey}>{key}</Text>
                  <Text style={styles.budgetCellValue}>{value}</Text>
                </View>
              )
            )}
          </View>
          <Text style={styles.italicSmall}>
            (All expenses are in your set currency.)
          </Text>
        </View>

        {itineraries.basic_info &&
          Object.keys(itineraries.basic_info).length > 0 && (
            <View>
              <Text style={styles.sectionTitle}>Need-To-Know Basics</Text>
              {itineraries.basic_info.currency && (
                <View style={styles.basicInfoItem}>
                  <Text style={styles.basicInfoLabel}>Currency</Text>
                  <Text style={styles.basicInfoValue}>
                    {itineraries.basic_info.currency}
                  </Text>
                </View>
              )}
              {itineraries.basic_info.sim_card_details && (
                <View style={styles.basicInfoItem}>
                  <Text style={styles.basicInfoLabel}>SIM Card Details</Text>
                  <Text style={styles.basicInfoValue}>
                    {itineraries.basic_info.sim_card_details}
                  </Text>
                </View>
              )}
              {itineraries.basic_info.useful_apps && (
                <View style={styles.basicInfoItem}>
                  <Text style={styles.basicInfoLabel}>Useful Apps</Text>
                  <Text style={styles.basicInfoValue}>
                    {itineraries.basic_info.useful_apps}
                  </Text>
                </View>
              )}
              {itineraries.basic_info.emergency_contacts && (
                <View style={styles.basicInfoItem}>
                  <Text style={styles.basicInfoLabel}>Emergency Contacts</Text>
                  <Text style={styles.basicInfoValue}>
                    {itineraries.basic_info.emergency_contacts}
                  </Text>
                </View>
              )}
            </View>
          )}
      </Page>
    </Document>
  );
};

export default ItineraryPDF;
