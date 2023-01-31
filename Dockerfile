# use code nodejs v18
FROM node:18-alpine
#set working directory
WORKDIR /src
#copy package json
COPY package*.json ./

#INSTALL DEPENDECY
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the application will run on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]