import React, { useEffect, useState } from 'react';
import { LayoutAnimation, Pressable, StyleSheet, View } from 'react-native';
import { Label, Paragraph, Script } from './Text/text';
import { Icon } from '@rneui/themed';
import { Colors } from '../theme';
import { Contact } from '../Contacts';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    borderColor: Colors.Navy,
    borderWidth: 1,
    padding: 8,
    borderRadius: 8,
    marginVertical: 8,
  },
  listItem: {
    flexDirection: 'row',
    paddingBottom: 6,
  },
});

function ContactItem({ item, selected }: { item: Contact; selected: boolean }) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded(selected);
  }, [selected]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Label.Large style={{ marginBottom: 8 }}>{item.name}</Label.Large>
        <Icon name={expanded ? 'expand-less' : 'expand-more'} />
      </View>
      {expanded && (
        <>
          <View style={styles.listItem}>
            <Icon name="phone" size={15} />
            <Paragraph.Small style={{ marginLeft: 6 }}>
              {item.phone}
            </Paragraph.Small>
          </View>
          <View style={styles.listItem}>
            <Icon name="email" size={15} />
            <Script.Small style={{ marginLeft: 6 }}>{item.email}</Script.Small>
          </View>
        </>
      )}
    </View>
  );
}

export default ContactItem;
