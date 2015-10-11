package configuration
import (
	"log"
	"os"
	"../model"
)

type Config struct {
	Manifest model.Manifest
	WebDir,
	Debug bool
}

func (config *Config) DebugLog(v ...interface{}) {
	if(config.Debug) {
		log.Println(v)
	}
}

func (config *Config) DebugErrorLog(e error) {
	if(config.Debug) {
		if(e != nil) {
			log.Println(e)
		}
	}
}

func (config *Config) Mkdir(path string, permissions os.FileMode) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		config.DebugLog("Makeing Directory: ", path)
		err = os.MkdirAll(path, permissions)
		if(err != nil) {
			config.DebugLog(err)
		}
	}
}

func (config *Config) Mkfile(path string) {
	if _, err := os.Stat(path); os.IsNotExist(err) {
		config.DebugLog("Makeing File: ", path)
		_, err = os.Create(path)
		if(err != nil) {
			config.DebugLog(err)
		}
	}
}