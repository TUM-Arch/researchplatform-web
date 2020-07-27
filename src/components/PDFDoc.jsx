import React from "react";
import {Page, Text, Image, Document, View} from "@react-pdf/renderer";
import styles from "../theme/pdfDocCSS";

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
          <View key={field.id}>
            <Text
              style={
                styles[`${field.nameEn}`] ? styles[`${field.nameEn}`] : styles.fieldName
              }
            >
              {language === "en" ? field.nameEn : field.nameDe}:
            </Text>
            <Text
              style={
                styles[`${field.nameEn}`] && styles[`${field.nameEn}`].text
                  ? styles[`${field.nameEn}`].text
                  : styles.text
              }
            >
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
