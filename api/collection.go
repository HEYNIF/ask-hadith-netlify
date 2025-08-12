/*
Package handler provides the HTTP handlers for the serverless API.
This file contains the handler for the /collection endpoint.
*/
package handler

import (
	"context"
	"encoding/json"
	"net/http"
	"os"
	"strconv"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

var mongoClient *mongo.Client

// GetHadithByCollection returns all hadith from a specific collection.
// Query parameters: collection_id (required), limit (optional, default 100), offset (optional, default 0)
func GetHadithByCollection(w http.ResponseWriter, r *http.Request) {
	ctx := r.Context()

	collectionID := r.URL.Query().Get("collection_id")
	if collectionID == "" {
		sendBadRequestResp(w, "collection_id is required")
		return
	}

	// Parse pagination parameters
	limitStr := r.URL.Query().Get("limit")
	offsetStr := r.URL.Query().Get("offset")
	
	limit := 100 // default limit
	offset := 0  // default offset
	
	if limitStr != "" {
		if l, err := strconv.Atoi(limitStr); err == nil && l > 0 {
			limit = l
		}
	}
	
	if offsetStr != "" {
		if o, err := strconv.Atoi(offsetStr); err == nil && o >= 0 {
			offset = o
		}
	}

	client, err := getMongoClient()
	if err != nil {
		sendServerErrorResp(w, err)
		return
	}
	
	collection := client.Database("hadith").Collection("hadiths")

	// Find all hadith from the specified collection
	filter := bson.M{"collection_id": collectionID}
	
	// Set up pagination
	findOptions := options.Find().
		SetLimit(int64(limit)).
		SetSkip(int64(offset)).
		SetSort(bson.D{{Key: "book_ref_no", Value: 1}}) // Sort by reference number

	cursor, err := collection.Find(ctx, filter, findOptions)
	if err != nil {
		sendServerErrorResp(w, err)
		return
	}
	defer cursor.Close(ctx)

	var hadiths []HadithResponse
	if err = cursor.All(ctx, &hadiths); err != nil {
		sendServerErrorResp(w, err)
		return
	}

	// Get total count for pagination info
	totalCount, err := collection.CountDocuments(ctx, filter)
	if err != nil {
		sendServerErrorResp(w, err)
		return
	}

	response := CollectionResponse{
		CollectionID: collectionID,
		Hadiths:      hadiths,
		Total:        totalCount,
		Limit:        limit,
		Offset:       offset,
	}

	sendResp(w, response)
}

type CollectionResponse struct {
	CollectionID string           `json:"collection_id"`
	Hadiths      []HadithResponse `json:"hadiths"`
	Total        int64            `json:"total"`
	Limit        int              `json:"limit"`
	Offset       int              `json:"offset"`
}

type HadithResponse struct {
	BodyEn        string   `json:"body_en" bson:"body_en"`
	BookEn        string   `json:"book_en" bson:"book_en"`
	BookNo        string   `json:"book_no" bson:"book_no"`
	BookRefNo     string   `json:"book_ref_no" bson:"book_ref_no"`
	ChapterEn     string   `json:"chapter_en" bson:"chapter_en"`
	ChapterNo     string   `json:"chapter_no" bson:"chapter_no"`
	Collection    string   `json:"collection" bson:"collection"`
	CollectionID  string   `json:"collection_id" bson:"collection_id"`
	HadithGrade   string   `json:"hadith_grade" bson:"hadith_grade"`
	HadithNo      string   `json:"hadith_no" bson:"hadith_no"`
	Highlights    []string `json:"highlights" bson:"highlights"`
	NarratorEn    string   `json:"narrator_en" bson:"narrator_en"`
	Score         float64  `json:"score" bson:"score"`
}

func getMongoClient() (*mongo.Client, error) {
	if mongoClient != nil {
		return mongoClient, nil
	}

	client, err := mongo.NewClient(options.Client().ApplyURI(os.Getenv("MONGO_URI")))
	if err != nil {
		return nil, err
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		return nil, err
	}

	mongoClient = client
	return mongoClient, nil
}

func sendResp(w http.ResponseWriter, data interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
	
	json.NewEncoder(w).Encode(data)
}

func sendBadRequestResp(w http.ResponseWriter, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusBadRequest)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

func sendServerErrorResp(w http.ResponseWriter, err error) {
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.WriteHeader(http.StatusInternalServerError)
	json.NewEncoder(w).Encode(map[string]string{"error": err.Error()})
} 