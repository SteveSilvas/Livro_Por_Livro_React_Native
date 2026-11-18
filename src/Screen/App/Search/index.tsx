import React, { useCallback, useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    SafeAreaView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import Button from '../../../UI/Button';
import { Input } from '../../../UI/Input/index';
import { BookCard } from '../../../UI/BookCard';
import { MessageModal } from '../../../UI/MessageModal/index';
import { MessageModalPropsType } from '../../../@Types/MessageModalPropsType';
import { BookType } from '../../../@Types/api';
import { getErrorMessage } from '../../../Util/errors';
import * as booksApi from '../../../services/api/books';

const SearchScreen = ({ navigation }: any) => {
    const [books, setBooks] = useState<BookType[]>([]);
    const [title, setTitle] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [modal, setModal] = useState<MessageModalPropsType>({
        message: '',
        showModal: false,
        closeModal: hideModal,
    });

    function hideModal(): void {
        setModal((prev) => ({ ...prev, showModal: false }));
    }

    const showModal = (message: string): void => {
        setModal({ message, showModal: true, closeModal: hideModal });
    };

    const search = useCallback(async () => {
        setLoading(true);
        try {
            const page = await booksApi.listBooks({
                title: title || undefined,
                limit: 50,
            });
            setBooks(page.data);
        } catch (error) {
            showModal(getErrorMessage(error, 'Não foi possível buscar livros.'));
        } finally {
            setLoading(false);
        }
    }, [title]);

    // Carrega o catálogo completo na primeira renderização.
    useEffect(() => {
        search();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const renderMessageModal = () => (
        <MessageModal
            showModal={modal.showModal}
            message={modal.message}
            closeModal={modal.closeModal}
        />
    );

    const renderHeader = () => (
        <View>
            <Text style={styles.title}>Catálogo de livros</Text>
            <Text style={styles.label}>Buscar por título:</Text>
            <Input
                type="default"
                placeholder="Ex.: Dom Casmurro"
                value={title}
                onChange={setTitle}
            />
            <Button text="Buscar" style={styles.button} onClick={search} />
            <Button
                text="Limpar"
                style={styles.button}
                onClick={() => {
                    setTitle('');
                }}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.root}>
            {renderMessageModal()}
            <FlatList
                data={books}
                keyExtractor={(item) => item.Uuid}
                ListHeaderComponent={renderHeader}
                ListEmptyComponent={
                    loading ? undefined : (
                        <Text style={styles.empty}>Nenhum livro encontrado.</Text>
                    )
                }
                renderItem={({ item }) => <BookCard book={item} showOwner />}
                contentContainerStyle={styles.list}
            />
            {loading && <ActivityIndicator style={styles.loading} />}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: '#FFF7D9',
    },
    list: {
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#785E91',
        marginBottom: 8,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
    },
    button: {
        marginTop: 8,
    },
    empty: {
        textAlign: 'center',
        color: '#7C8891',
        marginTop: 16,
    },
    loading: {
        marginVertical: 12,
    },
});

export default SearchScreen;
