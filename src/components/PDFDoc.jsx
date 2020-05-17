import React from "react";
import {Page, Text, Image, Document, View} from "@react-pdf/renderer";

const styles = {
  root: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    background: "#ff0000",
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    fontFamily: "Times-Roman",
  },
  chairName: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 40,
  },
  fieldName: {
    fontSize: 18,
    margin: 12,
    marginBottom: 2,
    fontFamily: "Times-Roman",
  },
  text: {
    margin: 12,
    marginTop: 0,
    fontSize: 14,
    textAlign: "justify",
    fontFamily: "Times-Roman",
  },
  image: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: "absolute",
    fontSize: 12,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "grey",
  },
};

export default function PDFDoc(props) {
  const {project, image, imageName, language} = props;
  const imageType = imageName ? imageName.match(/.*\.(.*)$/)[1] : "png";
  return (
    <Document>
      <Page style={styles.root}>
        <Text style={styles.title}>{project.name}</Text>
        <Text style={styles.chairName}>Chair Name: {project.chairName}</Text>
        <Image style={styles.image} src={`data:image/${imageType};base64, ${image}`} />
        <Text style={styles.fieldName}>Description:</Text>
        <Text style={styles.text}>{project.description}</Text>
        {project.tags.length !== 0 ? (
          <View>
            <Text style={styles.fieldName}>Tags:</Text>
            <Text style={styles.text}>{project.tags.map(tag => tag + ", ")}</Text>
          </View>
        ) : null}
        {project.fields.map(field => (
          <View>
            <Text style={styles.fieldName}>
              {language === "en" ? field.nameEn : field.nameDe}:
            </Text>
            <Text style={styles.text}>
              {language === "en" ? field.valueEn : field.valueDe}
            </Text>
          </View>
        ))}
        <Text
          style={styles.pageNumber}
          render={({pageNumber, totalPages}) => `${pageNumber} / ${totalPages}`}
          fixed
        />
      </Page>
    </Document>
  );
}
