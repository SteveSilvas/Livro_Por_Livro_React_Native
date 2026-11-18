import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { BookType } from '../../@Types/api';

interface BookCardProps {
    book: BookType;
    /** Exibe o dono (catálogo público) em vez de só o status (estante). */
    showOwner?: boolean;
}

/** Cartão de exibição de um livro, usado na estante e no catálogo. */
export function BookCard({ book, showOwner = true }: BookCardProps) {
    return (
        <View style={styles.card}>
            <Text style={styles.title}>{book.Title}</Text>
            <Text style={styles.author}>{book.Autor}</Text>
            <View style={styles.row}>
                {book.Category && (
                    <Text style={styles.tag}>{book.Category.Description}</Text>
                )}
                {book.Status && (
                    <Text style={styles.tag}>{book.Status.Name}</Text>
                )}
            </View>
            {showOwner && book.Owner && (
                <Text style={styles.owner}>Dono: {book.Owner.Name}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        borderWidth: 1,
        borderColor: '#7C8891',
        borderRadius: 12,
        padding: 12,
        marginBottom: 10,
        backgroundColor: '#FFFFFF',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#785E91',
    },
    author: {
        fontSize: 14,
        color: '#333',
    },
    row: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 6,
    },
    tag: {
        backgroundColor: '#EFE3FA',
        color: '#4B3B5A',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 8,
        fontSize: 12,
    },
    owner: {
        marginTop: 6,
        fontSize: 12,
        color: '#7C8891',
    },
});
